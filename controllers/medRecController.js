const { addRecordToDb } = require("../services/medical/addMedicalRecord.js");
const { addMedicationToDb } = require("../services/medical/addMedSchedule.js");
const { formatDate } = require("../services/formatDate.js");
const addMedicalRecord = async (req, res) => {
  try {
    // const {residentId} = parseInt(req.params.residentId);
    const residentId = req.params.residentId;
    // const residentId = 5;
    const {
      chronicIllness,
      medications,
      allergies,
      surgeryUndergone,
      otherRelevantInformation,
      recordDate,
    } = req.body;
    // check if there is specific date sent or add the current date
    let currentRecordDate;
    if (!recordDate) {
      const today = new Date();
      currentRecordDate = formatDate(today, "yyyy-mm-dd");
    }
    const newRecordId = await addRecordToDb(
      residentId,
      chronicIllness,
      medications,
      allergies,
      surgeryUndergone,
      otherRelevantInformation,
      recordDate ? recordDate : currentRecordDate
    );

    // create a new record (medicationSchedule) for each medication
    await addMedicationToDb(medications, newRecordId);
    return res
      .status(201)
      .json({ success: `Medical Record ${newRecordId} for resident ${residentId}` });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: `from medRecController => ${err.message}` });
  }
};

module.exports = addMedicalRecord;
