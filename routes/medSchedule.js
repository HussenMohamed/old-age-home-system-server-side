const express = require("express");
const router = express.Router();
router.patch("/:medicationId", require("../controllers/ScheduleController.js"));

module.exports = router;
