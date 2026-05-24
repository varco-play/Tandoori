const t = require('./translations');

function langKeyboard() {
  return {
    reply_markup: {
      keyboard: [
        [{ text: '🇺🇿 O\'zbek' }, { text: '🇺🇸 English' }],
        [{ text: '🇷🇺 Русский' }, { text: '🇪🇸 Español' }],
      ],
      resize_keyboard: true,
      one_time_keyboard: true,
    },
  };
}

function startKeyboard(lang) {
  return {
    reply_markup: {
      keyboard: [[{ text: t[lang].btnStart }]],
      resize_keyboard: true,
      one_time_keyboard: true,
    },
  };
}

function branchKeyboard() {
  return {
    reply_markup: {
      keyboard: [
        [{ text: 'Philadelphia' }],
        [{ text: 'Pittsburgh' }],
        [{ text: 'New York' }],
      ],
      resize_keyboard: true,
      one_time_keyboard: true,
    },
  };
}

function genderKeyboard(lang) {
  return {
    reply_markup: {
      keyboard: [
        [{ text: t[lang].genderMale }, { text: t[lang].genderFemale }],
      ],
      resize_keyboard: true,
      one_time_keyboard: true,
    },
  };
}

function locationKeyboard(lang) {
  return {
    reply_markup: {
      keyboard: [
        [{ text: t[lang].btnShareLocation, request_location: true }],
        [{ text: t[lang].btnTypeManually }],
      ],
      resize_keyboard: true,
      one_time_keyboard: true,
    },
  };
}

function usStatusKeyboard(lang) {
  return {
    reply_markup: {
      keyboard: [
        [{ text: t[lang].usStatusGreenCard }, { text: t[lang].usStatusCitizen }],
        [{ text: t[lang].usStatusVisa }, { text: t[lang].usStatusOther }],
      ],
      resize_keyboard: true,
      one_time_keyboard: true,
    },
  };
}

function yesNoKeyboard(lang) {
  return {
    reply_markup: {
      keyboard: [
        [{ text: t[lang].yes }, { text: t[lang].no }],
      ],
      resize_keyboard: true,
      one_time_keyboard: true,
    },
  };
}

function startDateKeyboard(lang) {
  return {
    reply_markup: {
      keyboard: [
        [{ text: t[lang].btnImmediately }, { text: t[lang].btnEnterDate }],
      ],
      resize_keyboard: true,
      one_time_keyboard: true,
    },
  };
}

function commentsKeyboard(lang) {
  return {
    reply_markup: {
      keyboard: [[{ text: t[lang].btnSkip }]],
      resize_keyboard: true,
      one_time_keyboard: true,
    },
  };
}

function reviewKeyboard(lang) {
  return {
    reply_markup: {
      keyboard: [
        [{ text: t[lang].btnSubmit }],
        [{ text: t[lang].btnEditAnswers }],
        [{ text: t[lang].btnCancel }],
      ],
      resize_keyboard: true,
    },
  };
}

function editFieldsKeyboard(lang, showWorkAuth) {
  const tr = t[lang];
  const fields = [
    tr.reviewName,
    tr.reviewAge,
    tr.reviewGender,
    tr.reviewCity,
    tr.reviewDistance,
    tr.reviewUsStatus,
    ...(showWorkAuth ? [tr.reviewWorkAuth] : []),
    tr.reviewExperience,
    tr.reviewLanguages,
    tr.reviewTransportation,
    tr.reviewHours,
    tr.reviewAvailability,
    tr.reviewStartDate,
    tr.reviewPhone,
    tr.reviewComments,
    tr.editBack,
  ];
  return {
    reply_markup: {
      keyboard: fields.map((f) => [{ text: f }]),
      resize_keyboard: true,
    },
  };
}

function cancelConfirmKeyboard(lang) {
  return {
    reply_markup: {
      keyboard: [
        [{ text: t[lang].btnYesCancel }],
        [{ text: t[lang].btnNoGoBack }],
      ],
      resize_keyboard: true,
      one_time_keyboard: true,
    },
  };
}

// Multi-select inline keyboard — callback_data: ms_0..ms_N and ms_d (done)
function buildMultiSelectMarkup(options, selected, doneText) {
  const rows = options.map((opt, i) => [{
    text: (selected.includes(opt) ? '✅ ' : '◻️ ') + opt,
    callback_data: 'ms_' + i,
  }]);
  rows.push([{ text: doneText, callback_data: 'ms_d' }]);
  return { inline_keyboard: rows };
}

function removeKeyboard() {
  return { reply_markup: { remove_keyboard: true } };
}

module.exports = {
  langKeyboard, startKeyboard, branchKeyboard, genderKeyboard,
  locationKeyboard, usStatusKeyboard, yesNoKeyboard, startDateKeyboard,
  commentsKeyboard, reviewKeyboard, editFieldsKeyboard, cancelConfirmKeyboard,
  buildMultiSelectMarkup, removeKeyboard,
};
