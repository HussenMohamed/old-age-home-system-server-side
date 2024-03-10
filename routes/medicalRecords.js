const express = require("express");
const router = express.Router();
router.post("/:residentId", require("../controllers/medRecController.js").addMedicalRecord);
router.get("/", require("../controllers/medRecController.js").getMedicalRecords);
router.get("/count", require("../controllers/medRecController.js").getMedicalRecordsCount);
router.get(
  "/:medicalRecordId",
  require("../controllers/medRecController.js").getSpecificMedicalRecord
);

module.exports = router;
