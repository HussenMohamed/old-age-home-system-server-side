const express = require("express");
const router = express.Router();
router.post("/", require("../controllers/familyMembersController").addFamilyMember);
router.get("/", require("../controllers/familyMembersController").getFamilyMembers);

module.exports = router;
