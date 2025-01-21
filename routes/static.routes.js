const express = require("express");
const urlModel = require("../models/url-shorter.model");

const router = express.Router();

router.get("/", async (req, res) => {
  const user = req.user;
  if (!user) return res.redirect("/login");
  const urls = await urlModel.find({ createdBy: req.user._id });

  return res.render("Home", { urls });
});

router.get("/signup", async (req, res) => {
  res.render("Signup");
});

router.get("/login", async (req, res) => {
  res.render("Login");
});

module.exports = router;
