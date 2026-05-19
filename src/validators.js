function validateAge(input) {
  const n = parseInt(input, 10);
  return !isNaN(n) && n >= 16 && n <= 80;
}

function validateNonEmpty(input) {
  return typeof input === 'string' && input.trim().length > 0;
}

function validateHours(input) {
  const n = parseInt(input, 10);
  return !isNaN(n) && n > 0 && n <= 168;
}

// Accept: Telegram location object, google maps link, or any non-empty text
function validateLocation(msg) {
  if (msg.location) return true;
  const text = (msg.text || '').trim();
  return text.length > 0;
}

module.exports = { validateAge, validateNonEmpty, validateHours, validateLocation };
