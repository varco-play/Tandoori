const t = require('./translations');

const BRANCH_LABELS = {
  philadelphia: 'Philadelphia',
  pittsburgh: 'Pittsburgh',
  new_york: 'New York',
};

function toUzYesNo(value, lang) {
  const tr = t[lang];
  if (!value) return '—';
  const lower = value.toString().toLowerCase();
  // detect yes/no in any supported language
  const yesWords = ['yes', 'ha', 'да'];
  const noWords = ['no', "yo'q", 'нет'];
  if (yesWords.includes(lower)) return 'Ha';
  if (noWords.includes(lower)) return "Yo'q";
  return value; // free text — keep as is
}

function toEnYesNo(value, lang) {
  if (!value) return '—';
  const lower = value.toString().toLowerCase();
  const yesWords = ['yes', 'ha', 'да'];
  const noWords = ['no', "yo'q", 'нет'];
  if (yesWords.includes(lower)) return 'Yes';
  if (noWords.includes(lower)) return 'No';
  return value;
}

function formatForAdmin(session, userId, username) {
  const d = session.data;
  const now = new Date().toISOString().replace('T', ' ').slice(0, 16);
  const branchLabel = BRANCH_LABELS[d.branch] || d.branch;
  const tgUser = username ? `@${username}` : '(none)';

  const header = `🆕 *NEW JOB APPLICATION*\n\n` +
    `🏪 *Branch:* ${branchLabel}\n` +
    `🕐 *Submitted at:* ${now} UTC\n` +
    `👤 *Telegram ID:* \`${userId}\`\n` +
    `💬 *Telegram Username:* ${tgUser}\n`;

  const enSection =
    `\n━━━━━━━━━━━━━━━━━━\n` +
    `🇺🇸 *ENGLISH VERSION*\n` +
    `━━━━━━━━━━━━━━━━━━\n\n` +
    `Full name: ${d.fullName || '—'}\n` +
    `Age: ${d.age || '—'}\n` +
    `Sex / Gender: ${d.gender || '—'}\n` +
    `Marital status: ${d.maritalStatus || '—'}\n` +
    `Current city: ${d.currentCity || '—'}\n` +
    `Distance / location: ${d.distanceOrLocation || '—'}\n` +
    `US status: ${d.usStatus || '—'}\n` +
    `Work authorization: ${toEnYesNo(d.workAuthorization, session.language)}\n` +
    `Previous work experience: ${d.experience || '—'}\n` +
    `Languages: ${d.languages || '—'}\n` +
    `Hours per week: ${d.hoursPerWeek || '—'}\n` +
    `Can work day shifts: ${toEnYesNo(d.dayShift, session.language)}\n` +
    `Can work night shifts: ${toEnYesNo(d.nightShift, session.language)}\n` +
    `Can work weekends: ${toEnYesNo(d.weekends, session.language)}\n` +
    `Start date: ${d.startDate || '—'}\n` +
    `Reliable transportation: ${toEnYesNo(d.transportation, session.language)}\n` +
    `Phone number: ${d.phone || '—'}\n` +
    `Telegram: ${tgUser}\n` +
    `Additional comments: ${d.comments || '—'}\n`;

  const uzSection =
    `\n━━━━━━━━━━━━━━━━━━\n` +
    `🇺🇿 *O'ZBEK VERSIYASI*\n` +
    `━━━━━━━━━━━━━━━━━━\n\n` +
    `To'liq ism: ${d.fullName || '—'}\n` +
    `Yosh: ${d.age || '—'}\n` +
    `Jinsi: ${d.gender || '—'}\n` +
    `Oilaviy holati: ${d.maritalStatus || '—'}\n` +
    `Hozir yashayotgan shahri: ${d.currentCity || '—'}\n` +
    `Bozorgacha masofa / lokatsiya: ${d.distanceOrLocation || '—'}\n` +
    `AQSHdagi statusi: ${d.usStatus || '—'}\n` +
    `Ishlashga ruxsati: ${toUzYesNo(d.workAuthorization, session.language)}\n` +
    `Oldingi ish tajribasi: ${d.experience || '—'}\n` +
    `Biladigan tillari: ${d.languages || '—'}\n` +
    `Haftasiga ishlay oladigan soatlari: ${d.hoursPerWeek || '—'}\n` +
    `Kunduzgi smenada ishlay oladimi: ${toUzYesNo(d.dayShift, session.language)}\n` +
    `Tungi smenada ishlay oladimi: ${toUzYesNo(d.nightShift, session.language)}\n` +
    `Dam olish kunlari ishlay oladimi: ${toUzYesNo(d.weekends, session.language)}\n` +
    `Qachon ish boshlay oladi: ${d.startDate || '—'}\n` +
    `Transporti bormi: ${toUzYesNo(d.transportation, session.language)}\n` +
    `Telefon raqami: ${d.phone || '—'}\n` +
    `Telegram: ${tgUser}\n` +
    `Qo'shimcha izoh: ${d.comments || '—'}\n`;

  return header + enSection + uzSection;
}

function buildReviewText(session, lang) {
  const tr = t[lang];
  const d = session.data;
  const BRANCH_LABELS = { philadelphia: 'Philadelphia', pittsburgh: 'Pittsburgh', new_york: 'New York' };

  const lines = [
    tr.reviewTitle,
    '',
    `${tr.reviewBranch}: ${BRANCH_LABELS[d.branch] || d.branch || '—'}`,
    `${tr.reviewName}: ${d.fullName || '—'}`,
    `${tr.reviewAge}: ${d.age || '—'}`,
    `${tr.reviewGender}: ${d.gender || '—'}`,
    `${tr.reviewMarital}: ${d.maritalStatus || '—'}`,
    `${tr.reviewCity}: ${d.currentCity || '—'}`,
    `${tr.reviewDistance}: ${d.distanceOrLocation || '—'}`,
    `${tr.reviewUsStatus}: ${d.usStatus || '—'}`,
    `${tr.reviewWorkAuth}: ${d.workAuthorization || '—'}`,
    `${tr.reviewExperience}: ${d.experience || '—'}`,
    `${tr.reviewLanguages}: ${d.languages || '—'}`,
    `${tr.reviewHours}: ${d.hoursPerWeek || '—'}`,
    `${tr.reviewDayShift}: ${d.dayShift || '—'}`,
    `${tr.reviewNightShift}: ${d.nightShift || '—'}`,
    `${tr.reviewWeekends}: ${d.weekends || '—'}`,
    `${tr.reviewStartDate}: ${d.startDate || '—'}`,
    `${tr.reviewTransportation}: ${d.transportation || '—'}`,
    `${tr.reviewPhone}: ${d.phone || '—'}`,
    `${tr.reviewTelegram}: ${d.telegramUsername || '—'}`,
    `${tr.reviewComments}: ${d.comments || '—'}`,
    tr.reviewActions,
  ];
  return lines.join('\n');
}

module.exports = { formatForAdmin, buildReviewText };
