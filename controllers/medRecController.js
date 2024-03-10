const { addRecordToDb } = require("../services/medical/addMedicalRecord.js");
const { getMedicalRecordsFromDb } = require("../services/medical/getMedicalRecordsFromDb.js");
const {
  getSpecificMedicalRecordFromDb,
} = require("../services/medical/getSpecificMedicalRecordFromDb.js");
const {
  getCountMedicalRecordsFromDb,
} = require("../services/medical/getCountMedicalRecordsFromDb.js");
const { formatDate } = require("../services/formatDate.js");
const addMedicalRecord = async (req, res) => {
  try {
    // const {residentId} = parseInt(req.params.residentId);
    const residentId = req.params.residentId;
    // const residentId = 5;
    const {
      chronicIllness,
      allergies,
      surgeryUndergone,
      otherRelevantInformation,
      recordDate,
      weight,
      height,
      bloodType,
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
      allergies,
      surgeryUndergone,
      otherRelevantInformation,
      recordDate ? recordDate : currentRecordDate,
      weight,
      height,
      bloodType
    );

    // create a new record (medicationSchedule) for each medication
    // await addMedicationToDb(medications, newRecordId);
    return res
      .status(201)
      .json({ success: `Medical Record ${newRecordId} for resident ${residentId}` });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: `from medRecController => ${err.message}` });
  }
};

const getMedicalRecords = async (req, res) => {
  try {
    const medicalRecords = await getMedicalRecordsFromDb();
    console.log(medicalRecords);
    res.status(200).json(medicalRecords);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

const getMedicalRecordsCount = async (req, res) => {
  try {
    const medicalRecords = await getCountMedicalRecordsFromDb();
    console.log(medicalRecords);
    res.status(200).json(medicalRecords);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

const getSpecificMedicalRecord = async (req, res) => {
  try {
    const { medicalRecordId } = req.params;
    const medicalRecord = await getSpecificMedicalRecordFromDb(medicalRecordId);
    console.log(medicalRecord);
    res.status(200).json(medicalRecord);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};
module.exports = {
  addMedicalRecord,
  getMedicalRecords,
  getMedicalRecordsCount,
  getSpecificMedicalRecord,
};
