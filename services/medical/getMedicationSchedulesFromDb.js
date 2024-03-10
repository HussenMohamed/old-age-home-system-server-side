const { pool } = require("../../model/db.config");

const getMedicationSchedulesFromDb = async (medicalRecordId) => {
  try {
    // Execute the SQL query to get a specific medical record from the database
    const [rows] = await pool.execute(
      `SELECT m.MedicationID, m.MedicationName, m.StartDate, m.EndDate, s.DayOfTheWeek, s.Time, s.Dosage FROM medications m JOIN scheduletime s ON m.MedicationID = s.MedicationID WHERE m.MedicalRecordID = ?`,
      [medicalRecordId]
    );

    // Check if a result is returned
    if (rows.length === 0) {
      // Handle the case where no record is found for the given ID
      return { error: "Medical record not found" };
    }
    // Organize data into the desired format
    const medicationSchedule = {};
    rows.forEach((row) => {
      const { MedicationID, MedicationName, StartDate, EndDate, DayOfTheWeek, Time, Dosage } = row;

      if (!medicationSchedule[MedicationID]) {
        medicationSchedule[MedicationID] = {
          MedicationName,
          StartDate,
          EndDate,
          DayOfTheWeeks: [],
          ScheduleTimes: [],
        };
      }

      if (!medicationSchedule[MedicationID].DayOfTheWeeks.includes(DayOfTheWeek)) {
        medicationSchedule[MedicationID].DayOfTheWeeks.push(DayOfTheWeek);
      }

      medicationSchedule[MedicationID].ScheduleTimes.push({ Time, Dosage });
    });

    // Convert DayOfTheWeeks to arrays if needed
    for (const medId in medicationSchedule) {
      if (Array.isArray(medicationSchedule[medId].DayOfTheWeeks)) {
        medicationSchedule[medId].DayOfTheWeeks =
          medicationSchedule[medId].DayOfTheWeeks.join(", ");
      }
    }
    // Transform the response object into the desired array structure
    const medicationArray = Object.keys(medicationSchedule).map((medicationId) => {
      const medicationInfo = medicationSchedule[medicationId];
      return {
        MedicationName: medicationInfo.MedicationName,
        MedicationID: parseInt(medicationId),
        StartDate: medicationInfo.StartDate,
        EndDate: medicationInfo.EndDate,
        DayOfTheWeeks: medicationInfo.DayOfTheWeeks,
        ScheduleTimes: medicationInfo.ScheduleTimes,
      };
    });

    const formattedMedicationSchedule = medicationArray.map((item) => {
      // Convert StartDate to a more readable string (date only)
      const startDate = new Date(item.StartDate).toLocaleDateString();

      // Convert EndDate to a more readable string (date only)
      const endDate = new Date(item.EndDate).toLocaleDateString();

      return {
        ...item,
        StartDate: startDate,
        EndDate: endDate,
      };
    });
    console.log(`From specific medical record query`);
    return formattedMedicationSchedule;
  } catch (error) {
    // return { error: error.message };
    return [{ error: error.message }];
  }
};

module.exports = { getMedicationSchedulesFromDb };
