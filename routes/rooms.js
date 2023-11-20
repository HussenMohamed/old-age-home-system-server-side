const express = require("express");
const router = express.Router();
router.post("/", require("../controllers/addRoomController.js"));

module.exports = router;
