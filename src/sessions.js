// In-memory session store. Swap for Redis/DB by replacing only this file.
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
      currentCity: '',
      distanceOrLocation: '',
      usStatus: '',
      workAuthorization: '', // 'auto' (GC/Citizen implied) | 'yes' | 'no'
      experience: '',        // 'None' or description text
      languages: '',         // comma-joined display labels
      transportation: '',
      hoursPerWeek: '',
      availability: '',      // comma-joined display labels
      startDate: '',
      phone: '',
      comments: '',
    },
    multiSelectState: null,  // { field, options[], selected[], messageId }
    editingField: null,      // non-null when editing from review screen
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

module.exports = {
  createSession, getSession, getOrCreateSession,
  updateSession, updateData, deleteSession,
};
