const express = require("express");
const router = express.Router();
router.post("/", require("../../controllers/staffController.js").addStaff);
router.get("/", require("../../controllers/staffController.js").getStaffMembers);
module.exports = router;
