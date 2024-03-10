const express = require("express");
const router = express.Router();
router.post("/", require("../controllers/RolesController.js").addRole);
router.get("/", require("../controllers/RolesController.js").getRoleNames);
router.get("/staffByRoles", require("../controllers/RolesController.js").getStaffGroupedByRoles);
module.exports = router;
