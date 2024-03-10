const express = require("express");
const router = express.Router();
router.post("/", require("../controllers/medicationController.js").addMedication);
router.get(
  "/:medicalRecordId",
  require("../controllers/medicationController.js").getMedicationSchedules
);

module.exports = router;
