const TelegramBot = require('node-telegram-bot-api');
const config = require('./config');
const t = require('./translations');
const {
  createSession, getSession, updateSession, updateData, deleteSession,
} = require('./sessions');
const {
  langKeyboard, startKeyboard, branchKeyboard, genderKeyboard,
  locationKeyboard, usStatusKeyboard, yesNoKeyboard, startDateKeyboard,
  commentsKeyboard, reviewKeyboard, editFieldsKeyboard, cancelConfirmKeyboard,
  buildMultiSelectMarkup, removeKeyboard,
} = require('./keyboards');
const { validateAge, validateNonEmpty, validateHours } = require('./validators');
const { formatForAdmin, buildReviewText, workAuthWasAsked } = require('./formatApplication');

let bot;

// ─── Bot factory ─────────────────────────────────────────────────────────────
function createBot() {
  if (config.mode === 'webhook') {
    bot = new TelegramBot(config.botToken, { webHook: true });
  } else {
    bot = new TelegramBot(config.botToken, { polling: true });
  }
  registerHandlers();
  return bot;
}

// ─── Helpers ─────────────────────────────────────────────────────────────────
async function send(chatId, text, opts = {}) {
  try {
    return await bot.sendMessage(chatId, text, { parse_mode: 'Markdown', ...opts });
  } catch (err) {
    console.error(`[BOT] sendMessage error to ${chatId}:`, err.message);
    throw err;
  }
}

function tr(lang, key) {
  return (t[lang] && t[lang][key] !== undefined) ? t[lang][key] : (t['en'][key] || key);
}

function isGCOrCitizen(usStatus, lang) {
  return usStatus === tr(lang, 'usStatusGreenCard') || usStatus === tr(lang, 'usStatusCitizen');
}

function isImmediately(startDate, lang) {
  return startDate === tr(lang, 'btnImmediately');
}

// ─── Step prompt sender ───────────────────────────────────────────────────────
async function sendStepPrompt(chatId, session, step) {
  const lang = session.language;
  switch (step) {
    case 'welcome':
      await send(chatId, tr(lang, 'welcome'), startKeyboard(lang));
      break;
    case 'choose_branch':
      await send(chatId, tr(lang, 'chooseBranch'), branchKeyboard());
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
    case 'ask_city':
      await send(chatId, tr(lang, 'askCity'), removeKeyboard());
      break;
    case 'ask_distance':
      await send(chatId, tr(lang, 'askDistance'), locationKeyboard(lang));
      break;
    case 'ask_distance_manual':
      await send(chatId, tr(lang, 'askDistanceManual'), removeKeyboard());
      break;
    case 'ask_us_status':
      await send(chatId, tr(lang, 'askUsStatus'), usStatusKeyboard(lang));
      break;
    case 'ask_work_auth':
      await send(chatId, tr(lang, 'askWorkAuth'), yesNoKeyboard(lang));
      break;
    case 'ask_experience_yn':
      await send(chatId, tr(lang, 'askExperienceYn'), yesNoKeyboard(lang));
      break;
    case 'ask_experience_detail':
      await send(chatId, tr(lang, 'askExperienceDetail'), removeKeyboard());
      break;
    case 'ask_languages':
      await showMultiSelect(chatId, session, session._userId, 'languages');
      break;
    case 'ask_transportation':
      await send(chatId, tr(lang, 'askTransportation'), yesNoKeyboard(lang));
      break;
    case 'ask_hours':
      await send(chatId, tr(lang, 'askHours'), removeKeyboard());
      break;
    case 'ask_availability':
      await showMultiSelect(chatId, session, session._userId, 'availability');
      break;
    case 'ask_start_date':
      await send(chatId, tr(lang, 'askStartDate'), startDateKeyboard(lang));
      break;
    case 'ask_start_date_input':
      await send(chatId, tr(lang, 'askStartDateInput'), removeKeyboard());
      break;
    case 'ask_phone':
      await send(chatId, tr(lang, 'askPhone'), removeKeyboard());
      break;
    case 'ask_comments':
      await send(chatId, tr(lang, 'askComments'), commentsKeyboard(lang));
      break;
    default:
      break;
  }
}

// ─── Multi-select inline keyboard sender ─────────────────────────────────────
async function showMultiSelect(chatId, session, userId, field) {
  const lang = session.language;
  const options = field === 'languages' ? tr(lang, 'langOptions') : tr(lang, 'availabilityOptions');
  const currentValue = session.data[field] || '';
  const currentSelected = currentValue
    ? currentValue.split(', ').filter(v => options.includes(v))
    : [];
  const markup = buildMultiSelectMarkup(options, currentSelected, tr(lang, 'btnDone'));
  const text = field === 'languages' ? tr(lang, 'askLanguages') : tr(lang, 'askAvailability');
  const msg = await bot.sendMessage(chatId, text, { reply_markup: markup });
  const ms = { field, options, selected: currentSelected, messageId: msg.message_id };
  updateSession(userId, { multiSelectState: ms, _userId: userId });
}

// ─── Review screen ────────────────────────────────────────────────────────────
async function showReview(chatId, session) {
  const lang = session.language;
  const text = buildReviewText(session, lang);
  const showWorkAuth = workAuthWasAsked(session.data);
  await send(chatId, text, reviewKeyboard(lang));
}

// ─── Confirm & send to admin ──────────────────────────────────────────────────
async function confirmAndSend(chatId, userId, session, username) {
  const lang = session.language;
  const branchKey = session.data.branch;
  const adminId = config.adminIds[branchKey];
  if (!adminId) {
    console.error(`[BOT] No admin ID for branch: ${branchKey}`);
    await send(chatId, tr(lang, 'errorAdminMissing'), removeKeyboard());
    return;
  }
  const adminMsg = formatForAdmin(session, userId, username);
  try {
    await bot.sendMessage(adminId, adminMsg, { parse_mode: 'Markdown' });
  } catch (err) {
    console.error(`[BOT] Failed to deliver to admin ${adminId}:`, err.message);
    await send(chatId, tr(lang, 'errorSending'), removeKeyboard());
    return;
  }
  deleteSession(userId);
  await send(chatId, tr(lang, 'successMessage'), removeKeyboard());
}

// ─── Next step logic (normal flow, no editing) ────────────────────────────────
function getNextStep(currentStep, session) {
  const lang = session.language;
  switch (currentStep) {
    case 'choose_language':    return 'welcome';
    case 'welcome':            return 'choose_branch';
    case 'choose_branch':      return 'ask_name';
    case 'ask_name':           return 'ask_age';
    case 'ask_age':            return 'ask_gender';
    case 'ask_gender':         return 'ask_city';
    case 'ask_city':           return 'ask_distance';
    case 'ask_distance':       return 'ask_us_status';
    case 'ask_distance_manual':return 'ask_us_status';
    case 'ask_us_status':
      return isGCOrCitizen(session.data.usStatus, lang) ? 'ask_experience_yn' : 'ask_work_auth';
    case 'ask_work_auth':      return 'ask_experience_yn';
    case 'ask_experience_yn':
      // experience is set at this step: 'None' if no, or proceed to detail
      return session.data.experience === tr(lang, 'noneText') ? 'ask_languages' : 'ask_experience_detail';
    case 'ask_experience_detail': return 'ask_languages';
    case 'ask_languages':      return 'ask_transportation';
    case 'ask_transportation': return 'ask_hours';
    case 'ask_hours':          return 'ask_availability';
    case 'ask_availability':   return 'ask_start_date';
    case 'ask_start_date':
      return isImmediately(session.data.startDate, lang) ? 'ask_phone' : 'ask_start_date_input';
    case 'ask_start_date_input': return 'ask_phone';
    case 'ask_phone':          return 'ask_comments';
    case 'ask_comments':       return 'review';
    default:                   return 'review';
  }
}

// ─── Advance to next step or return to review (edit mode) ────────────────────
async function advance(chatId, userId, currentStep, session) {
  const editing = session.editingField !== null;
  if (editing) {
    const freshSession = getSession(userId);
    updateSession(userId, { step: 'review', editingField: null });
    await showReview(chatId, getSession(userId));
  } else {
    const next = getNextStep(currentStep, session);
    updateSession(userId, { step: next, _userId: userId });
    const fresh = getSession(userId);
    if (next === 'review') {
      await showReview(chatId, fresh);
    } else {
      await sendStepPrompt(chatId, fresh, next);
    }
  }
}

// ─── Map review field label → step ───────────────────────────────────────────
function getEditStepForLabel(label, lang) {
  const tr_ = t[lang];
  const map = {
    [tr_.reviewName]:           'ask_name',
    [tr_.reviewAge]:            'ask_age',
    [tr_.reviewGender]:         'ask_gender',
    [tr_.reviewCity]:           'ask_city',
    [tr_.reviewDistance]:       'ask_distance',
    [tr_.reviewUsStatus]:       'ask_us_status',
    [tr_.reviewWorkAuth]:       'ask_work_auth',
    [tr_.reviewExperience]:     'ask_experience_yn',
    [tr_.reviewLanguages]:      'ask_languages',
    [tr_.reviewTransportation]: 'ask_transportation',
    [tr_.reviewHours]:          'ask_hours',
    [tr_.reviewAvailability]:   'ask_availability',
    [tr_.reviewStartDate]:      'ask_start_date',
    [tr_.reviewPhone]:          'ask_phone',
    [tr_.reviewComments]:       'ask_comments',
  };
  return map[label] || null;
}

// ─── Main message handler ─────────────────────────────────────────────────────
async function handleMessage(msg) {
  const chatId = msg.chat.id;
  const userId = msg.from.id.toString();
  const text = msg.text ? msg.text.trim() : '';
  const username = msg.from.username || '';

  // /start always resets
  if (text === '/start') {
    const sess = createSession(userId);
    sess._userId = userId;
    updateSession(userId, { _userId: userId });
    await send(chatId, tr('en', 'chooseLanguage'), langKeyboard());
    return;
  }

  let session = getSession(userId);
  if (!session) {
    await send(chatId, '👋 Send /start to begin your application.');
    return;
  }

  // Store userId in session for multi-select access
  if (!session._userId) updateSession(userId, { _userId: userId });
  session = getSession(userId);

  const lang = session.language || 'en';
  const step = session.step;
  const editing = session.editingField !== null;

  // ── Language selection ────────────────────────────────────────────────────
  if (step === 'choose_language') {
    let chosen = null;
    if (text.includes('O\'zbek') || text.includes('Uzbek')) chosen = 'uz';
    else if (text.includes('English')) chosen = 'en';
    else if (text.includes('Русский') || text.includes('Russian')) chosen = 'ru';
    else if (text.includes('Español') || text.includes('Spanish')) chosen = 'es';

    if (!chosen) {
      await send(chatId, tr('en', 'invalidLanguage'), langKeyboard());
      return;
    }
    updateSession(userId, { language: chosen, step: 'welcome' });
    await sendStepPrompt(chatId, getSession(userId), 'welcome');
    return;
  }

  // ── Welcome (wait for Start button) ─────────────────────────────────────
  if (step === 'welcome') {
    if (text === tr(lang, 'btnStart')) {
      updateSession(userId, { step: 'choose_branch' });
      await sendStepPrompt(chatId, getSession(userId), 'choose_branch');
    } else {
      await send(chatId, tr(lang, 'welcome'), startKeyboard(lang));
    }
    return;
  }

  // ── Cancel confirmation ───────────────────────────────────────────────────
  if (step === 'cancel_confirm') {
    if (text === tr(lang, 'btnYesCancel')) {
      deleteSession(userId);
      await send(chatId, tr(lang, 'cancelDone'), removeKeyboard());
    } else {
      updateSession(userId, { step: 'review' });
      await showReview(chatId, getSession(userId));
    }
    return;
  }

  // ── Review screen ─────────────────────────────────────────────────────────
  if (step === 'review') {
    if (text === tr(lang, 'btnSubmit')) {
      await confirmAndSend(chatId, userId, session, username);
      return;
    }
    if (text === tr(lang, 'btnEditAnswers')) {
      updateSession(userId, { step: 'edit_menu' });
      const showWorkAuth = workAuthWasAsked(session.data);
      await send(chatId, tr(lang, 'editTitle'), editFieldsKeyboard(lang, showWorkAuth));
      return;
    }
    if (text === tr(lang, 'btnCancel')) {
      updateSession(userId, { step: 'cancel_confirm' });
      await send(chatId, tr(lang, 'cancelConfirm'), cancelConfirmKeyboard(lang));
      return;
    }
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
      const showWorkAuth = workAuthWasAsked(session.data);
      await send(chatId, tr(lang, 'unknownCommand'), editFieldsKeyboard(lang, showWorkAuth));
      return;
    }
    updateSession(userId, { step: editStep, editingField: editStep, _userId: userId });
    await sendStepPrompt(chatId, getSession(userId), editStep);
    return;
  }

  // ── Application question steps ────────────────────────────────────────────

  switch (step) {

    case 'choose_branch': {
      const branches = ['Philadelphia', 'Pittsburgh', 'New York'];
      const branchKeys = { 'Philadelphia': 'philadelphia', 'Pittsburgh': 'pittsburgh', 'New York': 'new_york' };
      if (!branches.includes(text)) {
        await send(chatId, tr(lang, 'invalidBranch'), branchKeyboard());
        return;
      }
      updateData(userId, 'branch', branchKeys[text]);
      await advance(chatId, userId, 'choose_branch', getSession(userId));
      break;
    }

    case 'ask_name': {
      if (!validateNonEmpty(text)) { await send(chatId, tr(lang, 'invalidName')); return; }
      updateData(userId, 'fullName', text);
      await advance(chatId, userId, 'ask_name', getSession(userId));
      break;
    }

    case 'ask_age': {
      if (!validateAge(text)) { await send(chatId, tr(lang, 'invalidAge')); return; }
      updateData(userId, 'age', text);
      await advance(chatId, userId, 'ask_age', getSession(userId));
      break;
    }

    case 'ask_gender': {
      const valid = [tr(lang, 'genderMale'), tr(lang, 'genderFemale')];
      if (!valid.includes(text)) { await send(chatId, tr(lang, 'unknownCommand'), genderKeyboard(lang)); return; }
      updateData(userId, 'gender', text);
      await advance(chatId, userId, 'ask_gender', getSession(userId));
      break;
    }

    case 'ask_city': {
      if (!validateNonEmpty(text)) { await send(chatId, tr(lang, 'invalidCity')); return; }
      updateData(userId, 'currentCity', text);
      await advance(chatId, userId, 'ask_city', getSession(userId));
      break;
    }

    case 'ask_distance': {
      if (msg.location) {
        const coords = `${msg.location.latitude}, ${msg.location.longitude}`;
        updateData(userId, 'distanceOrLocation', coords);
        await advance(chatId, userId, 'ask_distance', getSession(userId));
      } else if (text === tr(lang, 'btnTypeManually')) {
        updateSession(userId, { step: 'ask_distance_manual' });
        await send(chatId, tr(lang, 'askDistanceManual'), removeKeyboard());
      } else if (validateNonEmpty(text)) {
        updateData(userId, 'distanceOrLocation', text);
        await advance(chatId, userId, 'ask_distance', getSession(userId));
      } else {
        await send(chatId, tr(lang, 'invalidDistance'), locationKeyboard(lang));
      }
      break;
    }

    case 'ask_distance_manual': {
      if (!validateNonEmpty(text)) { await send(chatId, tr(lang, 'invalidDistance')); return; }
      updateData(userId, 'distanceOrLocation', text);
      await advance(chatId, userId, 'ask_distance_manual', getSession(userId));
      break;
    }

    case 'ask_us_status': {
      const validOpts = [
        tr(lang, 'usStatusGreenCard'), tr(lang, 'usStatusCitizen'),
        tr(lang, 'usStatusVisa'), tr(lang, 'usStatusOther'),
      ];
      if (!validOpts.includes(text)) {
        await send(chatId, tr(lang, 'unknownCommand'), usStatusKeyboard(lang));
        return;
      }
      updateData(userId, 'usStatus', text);
      const autoAuth = isGCOrCitizen(text, lang);
      if (autoAuth) updateData(userId, 'workAuthorization', 'auto');

      if (editing) {
        if (autoAuth) {
          // GC/Citizen selected while editing — auto-set and return to review
          updateSession(userId, { step: 'review', editingField: null });
          await showReview(chatId, getSession(userId));
        } else {
          // Visa/Other while editing — need to ask work auth before returning
          updateData(userId, 'workAuthorization', '');
          updateSession(userId, { step: 'ask_work_auth', editingField: 'ask_work_auth' });
          await sendStepPrompt(chatId, getSession(userId), 'ask_work_auth');
        }
      } else {
        const next = autoAuth ? 'ask_experience_yn' : 'ask_work_auth';
        updateSession(userId, { step: next });
        await sendStepPrompt(chatId, getSession(userId), next);
      }
      break;
    }

    case 'ask_work_auth': {
      const valid = [tr(lang, 'yes'), tr(lang, 'no')];
      if (!valid.includes(text)) { await send(chatId, tr(lang, 'unknownCommand'), yesNoKeyboard(lang)); return; }
      const val = [tr(lang, 'yes')].includes(text) ? 'yes' : 'no';
      updateData(userId, 'workAuthorization', val);
      await advance(chatId, userId, 'ask_work_auth', getSession(userId));
      break;
    }

    case 'ask_experience_yn': {
      const valid = [tr(lang, 'yes'), tr(lang, 'no')];
      if (!valid.includes(text)) { await send(chatId, tr(lang, 'unknownCommand'), yesNoKeyboard(lang)); return; }
      if (text === tr(lang, 'no')) {
        updateData(userId, 'experience', tr(lang, 'noneText'));
        if (editing) {
          updateSession(userId, { step: 'review', editingField: null });
          await showReview(chatId, getSession(userId));
        } else {
          updateSession(userId, { step: 'ask_languages', _userId: userId });
          await sendStepPrompt(chatId, getSession(userId), 'ask_languages');
        }
      } else {
        // Yes — ask detail
        if (editing) {
          updateSession(userId, { step: 'ask_experience_detail', editingField: 'ask_experience_detail' });
        } else {
          updateSession(userId, { step: 'ask_experience_detail' });
        }
        await sendStepPrompt(chatId, getSession(userId), 'ask_experience_detail');
      }
      break;
    }

    case 'ask_experience_detail': {
      if (!validateNonEmpty(text)) { await send(chatId, tr(lang, 'invalidExperience')); return; }
      updateData(userId, 'experience', text);
      await advance(chatId, userId, 'ask_experience_detail', getSession(userId));
      break;
    }

    // ask_languages and ask_availability are handled via callback_query — ignore plain text
    case 'ask_languages':
    case 'ask_availability': {
      // Re-send the inline keyboard in case user typed instead of tapping
      await sendStepPrompt(chatId, getSession(userId), step);
      break;
    }

    case 'ask_transportation': {
      const valid = [tr(lang, 'yes'), tr(lang, 'no')];
      if (!valid.includes(text)) { await send(chatId, tr(lang, 'unknownCommand'), yesNoKeyboard(lang)); return; }
      updateData(userId, 'transportation', text);
      await advance(chatId, userId, 'ask_transportation', getSession(userId));
      break;
    }

    case 'ask_hours': {
      if (!validateHours(text)) { await send(chatId, tr(lang, 'invalidHours')); return; }
      updateData(userId, 'hoursPerWeek', text);
      await advance(chatId, userId, 'ask_hours', getSession(userId));
      break;
    }

    case 'ask_start_date': {
      const validBtns = [tr(lang, 'btnImmediately'), tr(lang, 'btnEnterDate')];
      if (!validBtns.includes(text)) { await send(chatId, tr(lang, 'unknownCommand'), startDateKeyboard(lang)); return; }
      if (text === tr(lang, 'btnImmediately')) {
        updateData(userId, 'startDate', tr(lang, 'immediatelyText'));
        await advance(chatId, userId, 'ask_start_date', getSession(userId));
      } else {
        if (editing) {
          updateSession(userId, { step: 'ask_start_date_input', editingField: 'ask_start_date_input' });
        } else {
          updateSession(userId, { step: 'ask_start_date_input' });
        }
        await sendStepPrompt(chatId, getSession(userId), 'ask_start_date_input');
      }
      break;
    }

    case 'ask_start_date_input': {
      if (!validateNonEmpty(text)) { await send(chatId, tr(lang, 'invalidStartDate')); return; }
      updateData(userId, 'startDate', text);
      await advance(chatId, userId, 'ask_start_date_input', getSession(userId));
      break;
    }

    case 'ask_phone': {
      if (!validateNonEmpty(text)) { await send(chatId, tr(lang, 'invalidPhone')); return; }
      updateData(userId, 'phone', text);
      await advance(chatId, userId, 'ask_phone', getSession(userId));
      break;
    }

    case 'ask_comments': {
      const val = text === tr(lang, 'btnSkip') ? tr(lang, 'skippedText') : text;
      if (!validateNonEmpty(val)) { await send(chatId, tr(lang, 'unknownCommand'), commentsKeyboard(lang)); return; }
      updateData(userId, 'comments', val);
      await advance(chatId, userId, 'ask_comments', getSession(userId));
      break;
    }

    default:
      await send(chatId, tr(lang, 'unknownCommand'));
      break;
  }
}

// ─── Inline keyboard callback handler ────────────────────────────────────────
async function handleCallbackQuery(query) {
  const userId = query.from.id.toString();
  const chatId = query.message.chat.id;
  const data = query.data;

  // Always answer to clear the loading spinner
  await bot.answerCallbackQuery(query.id).catch(() => {});

  const session = getSession(userId);
  if (!session || !session.multiSelectState) return;

  const ms = session.multiSelectState;
  const lang = session.language;

  if (data === 'ms_d') {
    // Done button pressed
    if (ms.selected.length === 0) {
      await bot.answerCallbackQuery(query.id, {
        text: tr(lang, 'selectAtLeastOne'),
        show_alert: true,
      }).catch(() => {});
      return;
    }
    const value = ms.selected.join(', ');
    updateData(userId, ms.field, value);

    // Remove inline keyboard from the message
    await bot.editMessageReplyMarkup(
      { inline_keyboard: [] },
      { chat_id: chatId, message_id: ms.messageId }
    ).catch(() => {});

    updateSession(userId, { multiSelectState: null });

    const editing = session.editingField !== null;
    if (editing) {
      updateSession(userId, { step: 'review', editingField: null });
      await showReview(chatId, getSession(userId));
    } else {
      const nextStep = ms.field === 'languages' ? 'ask_transportation' : 'ask_start_date';
      updateSession(userId, { step: nextStep, _userId: userId });
      await sendStepPrompt(chatId, getSession(userId), nextStep);
    }

  } else if (data.startsWith('ms_')) {
    // Toggle an option
    const idx = parseInt(data.replace('ms_', ''), 10);
    if (isNaN(idx) || idx >= ms.options.length) return;
    const opt = ms.options[idx];
    const sel = [...ms.selected];
    const existing = sel.indexOf(opt);
    if (existing >= 0) sel.splice(existing, 1);
    else sel.push(opt);
    ms.selected = sel;
    updateSession(userId, { multiSelectState: ms });

    await bot.editMessageReplyMarkup(
      buildMultiSelectMarkup(ms.options, ms.selected, tr(lang, 'btnDone')),
      { chat_id: chatId, message_id: ms.messageId }
    ).catch(() => {});
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

  bot.on('callback_query', async (query) => {
    try {
      await handleCallbackQuery(query);
    } catch (err) {
      console.error('[BOT] Unhandled error in callback_query handler:', err);
    }
  });

  bot.on('polling_error', (err) => console.error('[BOT] Polling error:', err.message));
  bot.on('webhook_error', (err) => console.error('[BOT] Webhook error:', err.message));
}

module.exports = { createBot, getBot: () => bot };
