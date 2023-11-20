const express = require("express");
const router = express.Router();

router.post("/", require("../controllers/feedbackController.js"));

module.exports = router;
