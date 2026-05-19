// In-memory session store. Replace with Redis or DB adapter later.
const sessions = {};

function createSession(userId) {
  sessions[userId] = {
    language: null,
    step: 'choose_language',
    data: {
      branch: '',
      fullName: '',
      age: '',
      gender: '',
      maritalStatus: '',
      currentCity: '',
      distanceOrLocation: '',
      usStatus: '',
      workAuthorization: '',
      experience: '',
      languages: '',
      hoursPerWeek: '',
      dayShift: '',
      nightShift: '',
      weekends: '',
      startDate: '',
      transportation: '',
      phone: '',
      telegramUsername: '',
      comments: '',
    },
    editingField: null,
  };
  return sessions[userId];
}

function getSession(userId) {
  return sessions[userId] || null;
}

function getOrCreateSession(userId) {
  return sessions[userId] || createSession(userId);
}

function updateSession(userId, updates) {
  if (!sessions[userId]) createSession(userId);
  Object.assign(sessions[userId], updates);
}

function updateData(userId, field, value) {
  if (!sessions[userId]) createSession(userId);
  sessions[userId].data[field] = value;
}

function deleteSession(userId) {
  delete sessions[userId];
}

module.exports = { createSession, getSession, getOrCreateSession, updateSession, updateData, deleteSession };
