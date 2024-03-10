const express = require("express");
const router = express.Router();
router.post("/", require("../controllers/addRoomController.js").addRoom);
router.get("/available", require("../controllers/addRoomController.js").getAvailableRooms);

module.exports = router;
