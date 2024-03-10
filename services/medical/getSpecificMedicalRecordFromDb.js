const { pool } = require("../../model/db.config");

const getSpecificMedicalRecordFromDb = async (medicalRecordId) => {
  try {
    // Execute the SQL query to get a specific medical record from the database
    const [result] = await pool.execute(
      `SELECT r.ResidentID, m.MedicalRecordID, m.ChronicIllness, m.Allergies, m.SurgeryUndergone, m.OtherRelevantInformation, m.ResidentID, m.record_date, m.weight, m.height, m.bloodType, r.Name, r.Age FROM medicalrecord m JOIN resident r ON m.ResidentID = r.ResidentID WHERE m.MedicalRecordID = ?;`,
      [medicalRecordId]
    );

    // Check if a result is returned
    if (result.length === 0) {
      // Handle the case where no record is found for the given ID
      return { error: "Medical record not found" };
    }

    // Convert ISO date string to a readable format (date only)
    const recordDate = new Date(result[0].record_date).toLocaleDateString();

    // Convert comma-separated strings to arrays
    const modifiedResult = {
      ...result[0],
      record_date: recordDate,
      ChronicIllness: result[0].ChronicIllness.split(","),
      Allergies: result[0].Allergies.split(","),
      SurgeryUndergone: result[0].SurgeryUndergone.split(","),
    };

    console.log(`From specific medical record query`);
    return modifiedResult;
  } catch (error) {
    return { error: error.message };
  }
};

module.exports = { getSpecificMedicalRecordFromDb };
