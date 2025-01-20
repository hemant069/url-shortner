const express = require("express");
const { handleUserSignup, handleUserLogin } = require("../routes/user.routes");

const router = express.Router();

router.post("/signup", handleUserSignup);
router.post("/login", handleUserLogin);

module.exports = router;
