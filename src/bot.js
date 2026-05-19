const TelegramBot = require('node-telegram-bot-api');
const config = require('./config');
const t = require('./translations');
const {
  createSession, getSession, getOrCreateSession,
  updateSession, updateData, deleteSession,
} = require('./sessions');
const {
  langKeyboard, branchKeyboard, genderKeyboard, maritalKeyboard,
  usStatusKeyboard, yesNoKeyboard, removeKeyboard, reviewKeyboard,
  editFieldsKeyboard, cancelConfirmKeyboard, locationKeyboard,
} = require('./keyboards');
const { validateAge, validateNonEmpty, validateHours, validateLocation } = require('./validators');
const { formatForAdmin, buildReviewText } = require('./formatApplication');

// ─── Bot initialization ───────────────────────────────────────────────────────

let bot;

function createBot() {
  if (config.mode === 'webhook') {
    bot = new TelegramBot(config.botToken, { webHook: true });
  } else {
    bot = new TelegramBot(config.botToken, { polling: true });
  }
  registerHandlers();
  return bot;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

async function send(chatId, text, opts = {}) {
  try {
    return await bot.sendMessage(chatId, text, { parse_mode: 'Markdown', ...opts });
  } catch (err) {
    console.error(`[BOT] sendMessage error to ${chatId}:`, err.message);
    throw err;
  }
}

function tr(lang, key) {
  return (t[lang] && t[lang][key]) ? t[lang][key] : (t['en'][key] || key);
}

// ─── Step flow definitions ────────────────────────────────────────────────────

const STEPS = [
  'choose_language',
  'choose_branch',
  'ask_name',
  'ask_age',
  'ask_gender',
  'ask_marital',
  'ask_city',
  'ask_distance',
  'ask_us_status',
  'ask_work_auth',
  'ask_experience',
  'ask_languages',
  'ask_hours',
  'ask_day_shift',
  'ask_night_shift',
  'ask_weekends',
  'ask_start_date',
  'ask_transportation',
  'ask_phone',
  'ask_telegram',
  'ask_comments',
  'review',
  'cancel_confirm',
  'edit_menu',
];

// Map edit field label → step name (for all 3 langs)
function getEditStepForLabel(label, lang) {
  const tr = t[lang];
  const map = {
    [tr.reviewName]: 'ask_name',
    [tr.reviewAge]: 'ask_age',
    [tr.reviewGender]: 'ask_gender',
    [tr.reviewMarital]: 'ask_marital',
    [tr.reviewCity]: 'ask_city',
    [tr.reviewDistance]: 'ask_distance',
    [tr.reviewUsStatus]: 'ask_us_status',
    [tr.reviewWorkAuth]: 'ask_work_auth',
    [tr.reviewExperience]: 'ask_experience',
    [tr.reviewLanguages]: 'ask_languages',
    [tr.reviewHours]: 'ask_hours',
    [tr.reviewDayShift]: 'ask_day_shift',
    [tr.reviewNightShift]: 'ask_night_shift',
    [tr.reviewWeekends]: 'ask_weekends',
    [tr.reviewStartDate]: 'ask_start_date',
    [tr.reviewTransportation]: 'ask_transportation',
    [tr.reviewPhone]: 'ask_phone',
    [tr.reviewTelegram]: 'ask_telegram',
    [tr.reviewComments]: 'ask_comments',
  };
  return map[label] || null;
}

// ─── Step prompt senders ──────────────────────────────────────────────────────

async function sendStepPrompt(chatId, session, step) {
  const lang = session.language;
  switch (step) {
    case 'choose_branch':
      await send(chatId, tr(lang, 'chooseBranch'), branchKeyboard(lang));
      break;
    case 'ask_name':
      await send(chatId, tr(lang, 'askName'), removeKeyboard());
      break;
    case 'ask_age':
      await send(chatId, tr(lang, 'askAge'), removeKeyboard());
      break;
    case 'ask_gender':
      await send(chatId, tr(lang, 'askGender'), genderKeyboard(lang));
      break;
    case 'ask_marital':
      await send(chatId, tr(lang, 'askMaritalStatus'), maritalKeyboard(lang));
      break;
    case 'ask_city':
      await send(chatId, tr(lang, 'askCity'), removeKeyboard());
      break;
    case 'ask_distance':
      await send(chatId, tr(lang, 'askDistance'), locationKeyboard(lang));
      break;
    case 'ask_us_status':
      await send(chatId, tr(lang, 'askUsStatus'), usStatusKeyboard(lang));
      break;
    case 'ask_work_auth':
      await send(chatId, tr(lang, 'askWorkAuth'), yesNoKeyboard(lang));
      break;
    case 'ask_experience':
      await send(chatId, tr(lang, 'askExperience'), removeKeyboard());
      break;
    case 'ask_languages':
      await send(chatId, tr(lang, 'askLanguages'), removeKeyboard());
      break;
    case 'ask_hours':
      await send(chatId, tr(lang, 'askHours'), removeKeyboard());
      break;
    case 'ask_day_shift':
      await send(chatId, tr(lang, 'askDayShift'), yesNoKeyboard(lang));
      break;
    case 'ask_night_shift':
      await send(chatId, tr(lang, 'askNightShift'), yesNoKeyboard(lang));
      break;
    case 'ask_weekends':
      await send(chatId, tr(lang, 'askWeekends'), yesNoKeyboard(lang));
      break;
    case 'ask_start_date':
      await send(chatId, tr(lang, 'askStartDate'), removeKeyboard());
      break;
    case 'ask_transportation':
      await send(chatId, tr(lang, 'askTransportation'), yesNoKeyboard(lang));
      break;
    case 'ask_phone':
      await send(chatId, tr(lang, 'askPhone'), removeKeyboard());
      break;
    case 'ask_telegram':
      await send(chatId, tr(lang, 'askTelegram'), removeKeyboard());
      break;
    case 'ask_comments':
      await send(chatId, tr(lang, 'askComments'), removeKeyboard());
      break;
    default:
      break;
  }
}

// ─── Review screen ────────────────────────────────────────────────────────────

async function showReview(chatId, session) {
  const lang = session.language;
  const reviewText = buildReviewText(session, lang);
  await send(chatId, reviewText, reviewKeyboard(lang));
}

// ─── Confirm & send application ───────────────────────────────────────────────

async function confirmAndSend(chatId, userId, session, username) {
  const lang = session.language;
  const branchKey = session.data.branch;
  const adminId = config.adminIds[branchKey];

  if (!adminId) {
    console.error(`[BOT] No admin ID configured for branch: ${branchKey}`);
    await send(chatId, tr(lang, 'errorAdminMissing'), removeKeyboard());
    return;
  }

  const adminMsg = formatForAdmin(session, userId, username);

  try {
    await bot.sendMessage(adminId, adminMsg, { parse_mode: 'Markdown' });
  } catch (err) {
    console.error(`[BOT] Failed to deliver application to admin ${adminId}:`, err.message);
    await send(chatId, tr(lang, 'errorSending'), removeKeyboard());
    return;
  }

  deleteSession(userId);
  await send(chatId, tr(lang, 'successMessage'), removeKeyboard());
}

// ─── Message handler ──────────────────────────────────────────────────────────

async function handleMessage(msg) {
  const chatId = msg.chat.id;
  const userId = msg.from.id.toString();
  const text = msg.text ? msg.text.trim() : '';
  const username = msg.from.username || '';

  // /start always resets
  if (text === '/start') {
    createSession(userId);
    const session = getSession(userId);
    await send(chatId, tr('en', 'chooseLanguage'), langKeyboard());
    return;
  }

  let session = getSession(userId);

  // No session — prompt /start
  if (!session) {
    await send(chatId, '👋 Send /start to begin your application.');
    return;
  }

  const lang = session.language || 'en';
  const step = session.step;

  // ── Language selection ────────────────────────────────────────────────────
  if (step === 'choose_language') {
    let chosen = null;
    if (text.includes('English')) chosen = 'en';
    else if (text.includes('Русский') || text.includes('Russian')) chosen = 'ru';
    else if (text.includes('O\'zbek') || text.includes('Uzbek')) chosen = 'uz';

    if (!chosen) {
      await send(chatId, tr('en', 'invalidLanguage'), langKeyboard());
      return;
    }

    updateSession(userId, { language: chosen, step: 'choose_branch' });
    await send(chatId, tr(chosen, 'welcome'), removeKeyboard());
    await sendStepPrompt(chatId, getSession(userId), 'choose_branch');
    return;
  }

  // ── Cancel confirmation screen ────────────────────────────────────────────
  if (step === 'cancel_confirm') {
    if (text === tr(lang, 'btnYesCancel')) {
      deleteSession(userId);
      await send(chatId, tr(lang, 'cancelDone'), removeKeyboard());
    } else {
      // Any other input returns to review
      updateSession(userId, { step: 'review' });
      await showReview(chatId, getSession(userId));
    }
    return;
  }

  // ── Review screen ─────────────────────────────────────────────────────────
  if (step === 'review') {
    if (text === tr(lang, 'btnConfirm')) {
      await confirmAndSend(chatId, userId, session, username);
      return;
    }
    if (text === tr(lang, 'btnEdit')) {
      updateSession(userId, { step: 'edit_menu' });
      await send(chatId, tr(lang, 'editTitle'), editFieldsKeyboard(lang));
      return;
    }
    if (text === tr(lang, 'btnCancel')) {
      updateSession(userId, { step: 'cancel_confirm' });
      await send(chatId, tr(lang, 'cancelConfirm'), cancelConfirmKeyboard(lang));
      return;
    }
    // Unrecognised — re-show review
    await showReview(chatId, session);
    return;
  }

  // ── Edit menu ─────────────────────────────────────────────────────────────
  if (step === 'edit_menu') {
    if (text === tr(lang, 'editBack')) {
      updateSession(userId, { step: 'review', editingField: null });
      await showReview(chatId, getSession(userId));
      return;
    }
    const editStep = getEditStepForLabel(text, lang);
    if (!editStep) {
      await send(chatId, tr(lang, 'unknownCommand'), editFieldsKeyboard(lang));
      return;
    }
    updateSession(userId, { step: editStep, editingField: editStep });
    await sendStepPrompt(chatId, getSession(userId), editStep);
    return;
  }

  // ── Application questions ─────────────────────────────────────────────────
  const editing = session.editingField;

  switch (step) {
    case 'choose_branch': {
      const branchMap = {
        'Philadelphia': 'philadelphia',
        'Pittsburgh': 'pittsburgh',
        'New York': 'new_york',
      };
      // Strip the emoji prefix if present
      const cleanText = text.replace('🏪 ', '');
      const branchKey = branchMap[cleanText];
      if (!branchKey) {
        await send(chatId, tr(lang, 'invalidBranch'), branchKeyboard(lang));
        return;
      }
      updateData(userId, 'branch', branchKey);
      const next = editing ? 'review' : 'ask_name';
      updateSession(userId, { step: next, editingField: null });
      if (editing) await showReview(chatId, getSession(userId));
      else await sendStepPrompt(chatId, getSession(userId), next);
      break;
    }

    case 'ask_name': {
      if (!validateNonEmpty(text)) {
        await send(chatId, tr(lang, 'invalidName'));
        return;
      }
      updateData(userId, 'fullName', text);
      const next = editing ? 'review' : 'ask_age';
      updateSession(userId, { step: next, editingField: null });
      if (editing) await showReview(chatId, getSession(userId));
      else await sendStepPrompt(chatId, getSession(userId), next);
      break;
    }

    case 'ask_age': {
      if (!validateAge(text)) {
        await send(chatId, tr(lang, 'invalidAge'));
        return;
      }
      updateData(userId, 'age', text);
      const next = editing ? 'review' : 'ask_gender';
      updateSession(userId, { step: next, editingField: null });
      if (editing) await showReview(chatId, getSession(userId));
      else await sendStepPrompt(chatId, getSession(userId), next);
      break;
    }

    case 'ask_gender': {
      const valid = [tr(lang, 'genderMale'), tr(lang, 'genderFemale'), tr(lang, 'genderOther')];
      if (!valid.includes(text)) {
        await send(chatId, tr(lang, 'unknownCommand'), genderKeyboard(lang));
        return;
      }
      updateData(userId, 'gender', text);
      const next = editing ? 'review' : 'ask_marital';
      updateSession(userId, { step: next, editingField: null });
      if (editing) await showReview(chatId, getSession(userId));
      else await sendStepPrompt(chatId, getSession(userId), next);
      break;
    }

    case 'ask_marital': {
      const valid = [
        tr(lang, 'maritalSingle'), tr(lang, 'maritalMarried'),
        tr(lang, 'maritalDivorced'), tr(lang, 'maritalWidowed'),
      ];
      if (!valid.includes(text)) {
        await send(chatId, tr(lang, 'unknownCommand'), maritalKeyboard(lang));
        return;
      }
      updateData(userId, 'maritalStatus', text);
      const next = editing ? 'review' : 'ask_city';
      updateSession(userId, { step: next, editingField: null });
      if (editing) await showReview(chatId, getSession(userId));
      else await sendStepPrompt(chatId, getSession(userId), next);
      break;
    }

    case 'ask_city': {
      if (!validateNonEmpty(text)) {
        await send(chatId, tr(lang, 'invalidCity'));
        return;
      }
      updateData(userId, 'currentCity', text);
      const next = editing ? 'review' : 'ask_distance';
      updateSession(userId, { step: next, editingField: null });
      if (editing) await showReview(chatId, getSession(userId));
      else await sendStepPrompt(chatId, getSession(userId), next);
      break;
    }

    case 'ask_distance': {
      let locationValue = '';
      if (msg.location) {
        locationValue = `📍 ${msg.location.latitude}, ${msg.location.longitude}`;
      } else if (!validateNonEmpty(text)) {
        await send(chatId, tr(lang, 'invalidDistance'), locationKeyboard(lang));
        return;
      } else {
        locationValue = text;
      }
      updateData(userId, 'distanceOrLocation', locationValue);
      const next = editing ? 'review' : 'ask_us_status';
      updateSession(userId, { step: next, editingField: null });
      if (editing) await showReview(chatId, getSession(userId));
      else await sendStepPrompt(chatId, getSession(userId), next);
      break;
    }

    case 'ask_us_status': {
      const opts = t[lang].usStatusOptions;
      if (!opts.includes(text)) {
        await send(chatId, tr(lang, 'unknownCommand'), usStatusKeyboard(lang));
        return;
      }
      updateData(userId, 'usStatus', text);
      const next = editing ? 'review' : 'ask_work_auth';
      updateSession(userId, { step: next, editingField: null });
      if (editing) await showReview(chatId, getSession(userId));
      else await sendStepPrompt(chatId, getSession(userId), next);
      break;
    }

    case 'ask_work_auth': {
      const valid = [tr(lang, 'yes'), tr(lang, 'no')];
      if (!valid.includes(text)) {
        await send(chatId, tr(lang, 'unknownCommand'), yesNoKeyboard(lang));
        return;
      }
      updateData(userId, 'workAuthorization', text);
      const next = editing ? 'review' : 'ask_experience';
      updateSession(userId, { step: next, editingField: null });
      if (editing) await showReview(chatId, getSession(userId));
      else await sendStepPrompt(chatId, getSession(userId), next);
      break;
    }

    case 'ask_experience': {
      if (!validateNonEmpty(text)) {
        await send(chatId, tr(lang, 'invalidExperience'));
        return;
      }
      updateData(userId, 'experience', text);
      const next = editing ? 'review' : 'ask_languages';
      updateSession(userId, { step: next, editingField: null });
      if (editing) await showReview(chatId, getSession(userId));
      else await sendStepPrompt(chatId, getSession(userId), next);
      break;
    }

    case 'ask_languages': {
      if (!validateNonEmpty(text)) {
        await send(chatId, tr(lang, 'invalidLanguages'));
        return;
      }
      updateData(userId, 'languages', text);
      const next = editing ? 'review' : 'ask_hours';
      updateSession(userId, { step: next, editingField: null });
      if (editing) await showReview(chatId, getSession(userId));
      else await sendStepPrompt(chatId, getSession(userId), next);
      break;
    }

    case 'ask_hours': {
      if (!validateHours(text)) {
        await send(chatId, tr(lang, 'invalidHours'));
        return;
      }
      updateData(userId, 'hoursPerWeek', text);
      const next = editing ? 'review' : 'ask_day_shift';
      updateSession(userId, { step: next, editingField: null });
      if (editing) await showReview(chatId, getSession(userId));
      else await sendStepPrompt(chatId, getSession(userId), next);
      break;
    }

    case 'ask_day_shift': {
      const valid = [tr(lang, 'yes'), tr(lang, 'no')];
      if (!valid.includes(text)) {
        await send(chatId, tr(lang, 'unknownCommand'), yesNoKeyboard(lang));
        return;
      }
      updateData(userId, 'dayShift', text);
      const next = editing ? 'review' : 'ask_night_shift';
      updateSession(userId, { step: next, editingField: null });
      if (editing) await showReview(chatId, getSession(userId));
      else await sendStepPrompt(chatId, getSession(userId), next);
      break;
    }

    case 'ask_night_shift': {
      const valid = [tr(lang, 'yes'), tr(lang, 'no')];
      if (!valid.includes(text)) {
        await send(chatId, tr(lang, 'unknownCommand'), yesNoKeyboard(lang));
        return;
      }
      updateData(userId, 'nightShift', text);
      const next = editing ? 'review' : 'ask_weekends';
      updateSession(userId, { step: next, editingField: null });
      if (editing) await showReview(chatId, getSession(userId));
      else await sendStepPrompt(chatId, getSession(userId), next);
      break;
    }

    case 'ask_weekends': {
      const valid = [tr(lang, 'yes'), tr(lang, 'no')];
      if (!valid.includes(text)) {
        await send(chatId, tr(lang, 'unknownCommand'), yesNoKeyboard(lang));
        return;
      }
      updateData(userId, 'weekends', text);
      const next = editing ? 'review' : 'ask_start_date';
      updateSession(userId, { step: next, editingField: null });
      if (editing) await showReview(chatId, getSession(userId));
      else await sendStepPrompt(chatId, getSession(userId), next);
      break;
    }

    case 'ask_start_date': {
      if (!validateNonEmpty(text)) {
        await send(chatId, tr(lang, 'invalidStartDate'));
        return;
      }
      updateData(userId, 'startDate', text);
      const next = editing ? 'review' : 'ask_transportation';
      updateSession(userId, { step: next, editingField: null });
      if (editing) await showReview(chatId, getSession(userId));
      else await sendStepPrompt(chatId, getSession(userId), next);
      break;
    }

    case 'ask_transportation': {
      const valid = [tr(lang, 'yes'), tr(lang, 'no')];
      if (!valid.includes(text)) {
        await send(chatId, tr(lang, 'unknownCommand'), yesNoKeyboard(lang));
        return;
      }
      updateData(userId, 'transportation', text);
      const next = editing ? 'review' : 'ask_phone';
      updateSession(userId, { step: next, editingField: null });
      if (editing) await showReview(chatId, getSession(userId));
      else await sendStepPrompt(chatId, getSession(userId), next);
      break;
    }

    case 'ask_phone': {
      if (!validateNonEmpty(text)) {
        await send(chatId, tr(lang, 'invalidPhone'));
        return;
      }
      updateData(userId, 'phone', text);
      const next = editing ? 'review' : 'ask_telegram';
      updateSession(userId, { step: next, editingField: null });
      if (editing) await showReview(chatId, getSession(userId));
      else await sendStepPrompt(chatId, getSession(userId), next);
      break;
    }

    case 'ask_telegram': {
      if (!validateNonEmpty(text)) {
        await send(chatId, tr(lang, 'invalidTelegram'));
        return;
      }
      updateData(userId, 'telegramUsername', text);
      const next = editing ? 'review' : 'ask_comments';
      updateSession(userId, { step: next, editingField: null });
      if (editing) await showReview(chatId, getSession(userId));
      else await sendStepPrompt(chatId, getSession(userId), next);
      break;
    }

    case 'ask_comments': {
      if (!validateNonEmpty(text)) {
        await send(chatId, tr(lang, 'invalidComments'));
        return;
      }
      updateData(userId, 'comments', text);
      updateSession(userId, { step: 'review', editingField: null });
      await showReview(chatId, getSession(userId));
      break;
    }

    default:
      await send(chatId, tr(lang, 'unknownCommand'));
      break;
  }
}

// ─── Register handlers ────────────────────────────────────────────────────────

function registerHandlers() {
  bot.on('message', async (msg) => {
    try {
      await handleMessage(msg);
    } catch (err) {
      console.error('[BOT] Unhandled error in message handler:', err);
    }
  });

  bot.on('polling_error', (err) => {
    console.error('[BOT] Polling error:', err.message);
  });

  bot.on('webhook_error', (err) => {
    console.error('[BOT] Webhook error:', err.message);
  });
}

module.exports = { createBot, getBot: () => bot };
