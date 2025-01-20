const express = require("express");
const urlModel = require("../models/url-shorter.model");

const router = express.Router();

router.get("/", async (req, res) => {
  const urls = await urlModel.find({});

  return res.render("Home", { urls });
});

router.get("/signup", async (req, res) => {
  res.render("Signup");
});

router.get("/login", async (req, res) => {
  res.render("Login");
});

module.exports = router;
