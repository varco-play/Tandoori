const t = require('./translations');

function langKeyboard() {
  return {
    reply_markup: {
      keyboard: [
        [{ text: '🇺🇸 English' }, { text: '🇷🇺 Русский' }, { text: '🇺🇿 O\'zbek' }],
      ],
      resize_keyboard: true,
      one_time_keyboard: true,
    },
  };
}

function branchKeyboard(lang) {
  return {
    reply_markup: {
      keyboard: [
        [{ text: '🏪 Philadelphia' }],
        [{ text: '🏪 Pittsburgh' }],
        [{ text: '🏪 New York' }],
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
        [{ text: t[lang].genderOther }],
      ],
      resize_keyboard: true,
      one_time_keyboard: true,
    },
  };
}

function maritalKeyboard(lang) {
  return {
    reply_markup: {
      keyboard: [
        [{ text: t[lang].maritalSingle }, { text: t[lang].maritalMarried }],
        [{ text: t[lang].maritalDivorced }, { text: t[lang].maritalWidowed }],
      ],
      resize_keyboard: true,
      one_time_keyboard: true,
    },
  };
}

function usStatusKeyboard(lang) {
  const opts = t[lang].usStatusOptions;
  return {
    reply_markup: {
      keyboard: opts.map((o) => [{ text: o }]),
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

function removeKeyboard() {
  return {
    reply_markup: {
      remove_keyboard: true,
    },
  };
}

function reviewKeyboard(lang) {
  return {
    reply_markup: {
      keyboard: [
        [{ text: t[lang].btnConfirm }],
        [{ text: t[lang].btnEdit }],
        [{ text: t[lang].btnCancel }],
      ],
      resize_keyboard: true,
    },
  };
}

function editFieldsKeyboard(lang) {
  const fields = [
    t[lang].reviewName,
    t[lang].reviewAge,
    t[lang].reviewGender,
    t[lang].reviewMarital,
    t[lang].reviewCity,
    t[lang].reviewDistance,
    t[lang].reviewUsStatus,
    t[lang].reviewWorkAuth,
    t[lang].reviewExperience,
    t[lang].reviewLanguages,
    t[lang].reviewHours,
    t[lang].reviewDayShift,
    t[lang].reviewNightShift,
    t[lang].reviewWeekends,
    t[lang].reviewStartDate,
    t[lang].reviewTransportation,
    t[lang].reviewPhone,
    t[lang].reviewTelegram,
    t[lang].reviewComments,
    t[lang].editBack,
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
        [{ text: t[lang].btnYesCancel }, { text: t[lang].btnNoGoBack }],
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
        [{ text: '📍 Share Location', request_location: true }],
      ],
      resize_keyboard: true,
      one_time_keyboard: true,
    },
  };
}

module.exports = {
  langKeyboard,
  branchKeyboard,
  genderKeyboard,
  maritalKeyboard,
  usStatusKeyboard,
  yesNoKeyboard,
  removeKeyboard,
  reviewKeyboard,
  editFieldsKeyboard,
  cancelConfirmKeyboard,
  locationKeyboard,
};
