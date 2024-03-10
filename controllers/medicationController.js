const { addMedicationToDb } = require("../services/medical/addMedicationToDb.js");
const { addScheduleTimesToDb } = require("../services/medical/addMedSchedule.js");
const {
  getMedicationSchedulesFromDb,
} = require("../services/medical/getMedicationSchedulesFromDb.js");
const addMedication = async (req, res) => {
  try {
    const {
      medicationName,
      medicalRecordId,
      startDate,
      endDate,
      intakeInstructions,
      type,
      scheduleTimes,
      days,
    } = req.body;
    // Note: scheduleTimes is an array of objects
    const newMedicationId = await addMedicationToDb(
      medicationName,
      medicalRecordId,
      startDate,
      endDate,
      intakeInstructions,
      type
    );
    // pass the id of the new medication
    const newScheduleTimes = await addScheduleTimesToDb(newMedicationId, scheduleTimes, days);
    console.log(`new medication with id: ${newMedicationId}`);
    return res.status(201).json({ success: `New Medication with id ${newMedicationId} created!` });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

const getMedicationSchedules = async (req, res) => {
  try {
    const { medicalRecordId } = req.params;
    const medicationSchedules = await getMedicationSchedulesFromDb(medicalRecordId);
    console.log(medicationSchedules);
    res.status(200).json(medicationSchedules);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

module.exports = { addMedication, getMedicationSchedules };
