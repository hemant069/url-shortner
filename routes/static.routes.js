const express = require("express");
const urlModel = require("../models/url-shorter.model");
const { restrictTo } = require("../middleware");

const router = express.Router();

// For the Admin only

router.get("/urls", restrictTo(["ADMIN"]), async (req, res) => {
  const urls = await urlModel.find({});

  return res.render("Home", { urls });
});

router.get("/", restrictTo(["NORMAL", "ADMIN"]), async (req, res) => {
  // const user = req.user;
  // if (!user) return res.redirect("/login");
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
