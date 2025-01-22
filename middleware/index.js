const { getSessionId } = require("../service");

const restrictToLoggedinUserOnly = async (req, res, next) => {
  const useruuid = req.headers["Authorization"];
  const token = useruuid.split("Bearer ")[1];

  if (!useruuid) return res.redirect("/login");

  const user = getSessionId(token);

  if (!user) return res.redirect("/login");

  req.user = user;

  next();
};

const CheckAuth = async (req, res, next) => {
  const useruuid = req.headers["authorization"];

  const token = useruuid.split("Bearer ")[1];
  console.log(token);

  const user = getSessionId(token);

  console.log(user);

  req.user = user;

  next();
};

module.exports = { restrictToLoggedinUserOnly, CheckAuth };
