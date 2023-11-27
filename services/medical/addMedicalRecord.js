const { pool } = require("../../model/db.config");

const addRecordToDb = async (
  residentId,
  chronicIllness,
  medications,
  allergies,
  surgeryUndergone,
  otherRelevantInformation,
  recordDate
) => {
  try {
    // convert medications and allergies arrays into string
    const medicationsText = medications.toString();
    const allergiesText = allergies.toString();
    // Execute the SQL query to insert a new medical record into the database
    const [result] = await pool.execute(
      `INSERT INTO medicalrecord (ResidentID, ChronicIllness, Medications, Allergies, SurgeryUndergone, OtherRelevantInformation, record_date) VALUES (?,?,?,?,?,?,?)`,
      [
        residentId,
        chronicIllness,
        medicationsText,
        allergiesText,
        surgeryUndergone,
        otherRelevantInformation,
        recordDate,
      ]
    );

    // Check if the insertion was successful
    if (result.affectedRows === 0) {
      // If no rows were affected, throw an error indicating a failed insertion
      throw { statusCode: 500, message: "Failed to insert Medical Record into the database" };
    }

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
