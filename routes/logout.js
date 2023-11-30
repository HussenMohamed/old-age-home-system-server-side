const express = require("express");
const router = express.Router();

router.get("/", require("../controllers/logoutController.js"));

module.exports = router;
