// Below is the Example for the Statefull Authentication
/*
let sessionIdMap = new Map();

const getSessionId = (id) => {
  return sessionIdMap.get(id);
};

const setSessionId = (id, user) => {
  sessionIdMap.set(id, user);
};
*/

const jwt = require("jsonwebtoken");
const secret = "Hemant@123";

const setSessionId = (user) => {
  return jwt.sign(
    {
      id: user._id,
      email: user.email,
      role: user.role,
    },
    secret
  );
};

const getSessionId = (token) => {
  try {
    if (!token) return null;
    return jwt.verify(token, secret);
  } catch (error) {}
};

module.exports = { getSessionId, setSessionId };
