const {
  addMedDosageToDb,
  addScheduleTimesToDb,
} = require("../services/medical/editMedSchedule.js");

const handleDosageAndSchedule = async (req, res) => {
  try {
    const medicationId = req.params.medicationId;
    const { dosage, scheduleTimes } = req.body;

    const addedDosage = await addMedDosageToDb(medicationId, dosage);

    // create a new scheduletime
    scheduleTimes.forEach(async (scheduleTime) => {
      await addScheduleTimesToDb(medicationId, scheduleTime.day, scheduleTime.times);
    });

    return res.status(201).json({ success: `New Dosage added for medication id ${medicationId}` });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: `from Schedule Controller => ${err.message}` });
  }
};

module.exports = handleDosageAndSchedule;
