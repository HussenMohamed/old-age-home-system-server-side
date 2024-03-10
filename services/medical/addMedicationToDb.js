const { pool } = require("../../model/db.config");

const addMedicationToDb = async (
  medicationName,
  medicalRecordId,
  startDate,
  endDate,
  intakeInstructions,
  type
) => {
  // `INSERT INTO medications (MedicationName,MedicalRecordId,StartDate,EndDate,IntakeInstructions,MedicationType) VALUES (?, ?, ?, ?, ?, ?)`,

  try {
    const [result] = await pool.execute(
      "INSERT INTO medications (MedicationName,MedicalRecordId,StartDate,IntakeInstructions,MedicationType,EndDate) VALUES (?, ?, ?, ?, ?, ?)",
      [medicationName, medicalRecordId, startDate, intakeInstructions, type, endDate]
    );

    const insertedMedicationtId = result.insertId;

    // You can return the inserted medication ID or any other relevant information
    return insertedMedicationtId;
  } catch (error) {
    // Handle any error that might occur during the database query
    console.error("Error adding resident:", error.message);
    throw error; // Re-throw the error to let the calling function handle it
  }
};

module.exports = { addMedicationToDb };
