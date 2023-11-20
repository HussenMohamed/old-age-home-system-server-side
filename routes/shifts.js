const express = require("express");
const router = express.Router();
// const addRoom = require("../controllers/addRoomController.js");
router.post("/", require("../controllers/addShiftController.js"));

module.exports = router;
