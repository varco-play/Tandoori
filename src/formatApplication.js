const t = require('./translations');

const BRANCH_LABELS = {
  philadelphia: 'Philadelphia',
  pittsburgh: 'Pittsburgh',
  new_york: 'New York',
};

// Normalize yes/no values (stored in user's language) to canonical EN/UZ
function toEn(value) {
  if (!value) return '—';
  const v = value.toLowerCase();
  if (['ha', 'yes', 'да', 'sí', 'si'].includes(v)) return 'Yes';
  if (["yo'q", 'no', 'нет'].includes(v)) return 'No';
  return value;
}
function toUz(value) {
  if (!value) return '—';
  const v = value.toLowerCase();
  if (['ha', 'yes', 'да', 'sí', 'si'].includes(v)) return 'Ha';
  if (["yo'q", 'no', 'нет'].includes(v)) return "Yo'q";
  return value;
}

// Work auth display — for GC/Citizen it's 'auto', for Visa/Other it's yes/no
function workAuthEn(d) {
  if (d.workAuthorization === 'auto') return '✅ Authorized (' + d.usStatus + ')';
  return toEn(d.workAuthorization) === 'Yes' ? '✅ Yes' : '❌ No';
}
function workAuthUz(d) {
  if (d.workAuthorization === 'auto') return '✅ Ruxsat bor (' + d.usStatus + ')';
  return toUz(d.workAuthorization) === 'Ha' ? '✅ Ha' : "❌ Yo'q";
}

// Check if work auth was explicitly asked (Visa or Other)
function workAuthWasAsked(d) {
  return d.workAuthorization !== '' && d.workAuthorization !== 'auto';
}

function formatForAdmin(session, userId, username) {
  const d = session.data;
  const now = new Date().toISOString().replace('T', ' ').slice(0, 16);
  const branchLabel = BRANCH_LABELS[d.branch] || d.branch;
  const tgUser = username ? `@${username}` : '(none)';

  const header =
    `🆕 *NEW JOB APPLICATION*\n\n` +
    `📍 *Branch:* ${branchLabel}\n` +
    `🕐 *Submitted:* ${now} UTC\n` +
    `👤 *Telegram ID:* \`${userId}\`\n` +
    `💬 *Username:* ${tgUser}\n`;

  const enSection =
    `\n━━━━━━━━━━━━━━━━━━\n` +
    `🇺🇸 *ENGLISH*\n` +
    `━━━━━━━━━━━━━━━━━━\n\n` +
    `👤 Full Name: ${d.fullName || '—'}\n` +
    `🎂 Age: ${d.age || '—'}\n` +
    `⚧ Gender: ${d.gender || '—'}\n` +
    `🏙 Current City: ${d.currentCity || '—'}\n` +
    `📍 Location: ${d.distanceOrLocation || '—'}\n` +
    `🇺🇸 US Status: ${d.usStatus || '—'}\n` +
    `✅ Work Authorization: ${workAuthEn(d)}\n` +
    `💼 Work Experience: ${d.experience || '—'}\n` +
    `🌐 Languages: ${d.languages || '—'}\n` +
    `🚗 Transportation: ${toEn(d.transportation)}\n` +
    `⏱ Hours / Week: ${d.hoursPerWeek || '—'}\n` +
    `⏱ Availability: ${d.availability || '—'}\n` +
    `📅 Start Date: ${d.startDate || '—'}\n` +
    `📞 Phone: ${d.phone || '—'}\n` +
    `📝 Additional Notes: ${d.comments || '—'}\n`;

  const uzSection =
    `\n━━━━━━━━━━━━━━━━━━\n` +
    `🇺🇿 *O'ZBEK*\n` +
    `━━━━━━━━━━━━━━━━━━\n\n` +
    `👤 To'liq ism: ${d.fullName || '—'}\n` +
    `🎂 Yosh: ${d.age || '—'}\n` +
    `⚧ Jinsi: ${d.gender || '—'}\n` +
    `🏙 Hozirgi shahri: ${d.currentCity || '—'}\n` +
    `📍 Lokatsiya: ${d.distanceOrLocation || '—'}\n` +
    `🇺🇸 AQSHdagi statusi: ${d.usStatus || '—'}\n` +
    `✅ Ishlash huquqi: ${workAuthUz(d)}\n` +
    `💼 Ish tajribasi: ${d.experience || '—'}\n` +
    `🌐 Tillar: ${d.languages || '—'}\n` +
    `🚗 Transport: ${toUz(d.transportation)}\n` +
    `⏱ Soat / Hafta: ${d.hoursPerWeek || '—'}\n` +
    `⏱ Ish vaqti: ${d.availability || '—'}\n` +
    `📅 Boshlanish sanasi: ${d.startDate || '—'}\n` +
    `📞 Telefon: ${d.phone || '—'}\n` +
    `📝 Qo'shimcha izoh: ${d.comments || '—'}\n`;

  return header + enSection + uzSection;
}

function buildReviewText(session, lang) {
  const tr = t[lang];
  const d = session.data;
  const branchLabel = BRANCH_LABELS[d.branch] || d.branch || '—';

  const showWorkAuth = d.workAuthorization !== '' && d.workAuthorization !== 'auto';

  // Work auth display for review
  let workAuthDisplay = '';
  if (d.workAuthorization === 'auto') {
    workAuthDisplay = tr.workAuthAuto;
  } else if (d.workAuthorization) {
    const isYes = ['ha', 'yes', 'да', 'sí', 'si'].includes(d.workAuthorization.toLowerCase());
    workAuthDisplay = isYes ? '✅ ' + d.workAuthorization : '❌ ' + d.workAuthorization;
  }

  const lines = [
    tr.reviewTitle,
    '',
    `${tr.reviewBranch}: ${branchLabel}`,
    `${tr.reviewName}: ${d.fullName || '—'}`,
    `${tr.reviewAge}: ${d.age || '—'}`,
    `${tr.reviewGender}: ${d.gender || '—'}`,
    `${tr.reviewCity}: ${d.currentCity || '—'}`,
    `${tr.reviewDistance}: ${d.distanceOrLocation || '—'}`,
    `${tr.reviewUsStatus}: ${d.usStatus || '—'}`,
    ...(showWorkAuth ? [`${tr.reviewWorkAuth}: ${workAuthDisplay}`] : []),
    `${tr.reviewExperience}: ${d.experience || '—'}`,
    `${tr.reviewLanguages}: ${d.languages || '—'}`,
    `${tr.reviewTransportation}: ${d.transportation || '—'}`,
    `${tr.reviewHours}: ${d.hoursPerWeek || '—'}`,
    `${tr.reviewAvailability}: ${d.availability || '—'}`,
    `${tr.reviewStartDate}: ${d.startDate || '—'}`,
    `${tr.reviewPhone}: ${d.phone || '—'}`,
    `${tr.reviewComments}: ${d.comments || '—'}`,
    tr.reviewActions,
  ];
  return lines.join('\n');
}

module.exports = { formatForAdmin, buildReviewText, workAuthWasAsked };
