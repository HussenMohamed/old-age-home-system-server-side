const { pool } = require("../../model/db.config");

const addRecordToDb = async (
  residentId,
  chronicIllness,
  allergies,
  surgeryUndergone,
  otherRelevantInformation,
  recordDate,
  weight,
  height,
  bloodType
) => {
  try {
    // convert allergies arrays into string
    const allergiesText = allergies.toString();
    const chronicIllnessText = chronicIllness.toString();
    const surgeryUndergoneText = surgeryUndergone.toString();
    // const allergiesText = allergies.toString();

    // Execute the SQL query to insert a new medical record into the database
    const [result] = await pool.execute(
      `INSERT INTO medicalrecord (ResidentID, ChronicIllness, Allergies, SurgeryUndergone, OtherRelevantInformation, record_date , weight, height, bloodType) VALUES (?,?,?,?,?,?,?,?,?)`,
      [
        residentId,
        chronicIllnessText,
        allergiesText,
        surgeryUndergoneText,
        otherRelevantInformation,
        recordDate,
        weight,
        height,
        bloodType,
      ]
    );

    // Check if the insertion was successful
    if (result.affectedRows === 0) {
      // If no rows were affected, throw an error indicating a failed insertion
      throw { statusCode: 500, message: "Failed to insert Medical Record into the database" };
    }
    // If the insertion was successful then mark the resident that he has a medical record
    const [result2] = await pool.execute(
      `UPDATE resident SET hasMedicalRecord = true WHERE ResidentID = ?`,
      [residentId]
    );
    // Return the insertId
    return result.insertId;
  } catch (error) {
    // Log the error
    console.error("Error adding Medical Record to the database:", error.message);

    // Re-throw the error to propagate it up the call stack
    throw error;
  }
};

module.exports = { addRecordToDb };
