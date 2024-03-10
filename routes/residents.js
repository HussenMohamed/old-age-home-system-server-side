const express = require("express");
const router = express.Router();

router.post("/", require("../controllers/addResident.js").addResident);
router.get("/", require("../controllers/addResident.js").getResidents);
router.get(
  "/noMedicalRecordsCount",
  require("../controllers/addResident.js").getCountResidentsWithNoMedicalRecords
);
router.get(
  "/noMedicalRecords",
  require("../controllers/addResident.js").getResidentsWithNoMedicalRecords
);
router.get("/:residentId", require("../controllers/addResident.js").getSpecificResident);

module.exports = router;
