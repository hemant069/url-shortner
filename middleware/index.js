const { getSessionId } = require("../service");

//  Below Code for the Authentications and checking the normal auth and restrict for the user loggedin
/*
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

*/

function checkForAuthentication(req, res, next) {
  const tokenCookie = req.cookies?.token;

  if (!tokenCookie) return next();

  const user = getSessionId(tokenCookie);

  req.user = user;

  return next();
}

function restrictTo(roles = []) {
  return function (req, res, next) {
    if (!req.user) {
      return res.redirect("/login");
    }

    if (!roles.includes(req.user.role)) return res.end("UnAuthorized");

    return next();
  };
}

module.exports = { restrictTo, checkForAuthentication };
