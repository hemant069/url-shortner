let sessionIdMap = new Map();

const getSessionId = (id) => {
  return sessionIdMap.get(id);
};

const setSessionId = (id, user) => {
  sessionIdMap.set(id, user);
};

module.exports = { getSessionId, setSessionId };
