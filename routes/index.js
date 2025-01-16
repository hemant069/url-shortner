const express = require("express");
const {
  handlecreateurl,
  handlegeturl,
  handlegetanalytics,
} = require("../controller");

const router = express.Router();

router.post("/", handlecreateurl);
router.get("/:id", handlegeturl);
router.get("/analytics/:id", handlegetanalytics);

module.exports = router;
