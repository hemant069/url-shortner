const { getSessionId } = require("../service");

const restrictToLoggedinUserOnly = async (req, res, next) => {
  console.log(req);
  const useruuid = req?.cookies?.uid;

  if (!useruuid) return res.redirect("/login");

  const user = getSessionId(useruuid);

  if (!user) return res.redirect("/login");

  req.user = user;

  next();
};

const CheckAuth = async (req, res, next) => {
  const useruuid = req?.cookies?.uid;

  const user = getSessionId(useruuid);

  req.user = user;

  next();
};

module.exports = { restrictToLoggedinUserOnly, CheckAuth };
