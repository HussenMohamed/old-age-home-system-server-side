const { pool } = require("../../model/db.config");

const addMedicationToDb = async (medications, newRecordId) => {
  medications.forEach(async (medication) => {
    try {
      // Execute the SQL query to insert a new medical record into the database
      const [result] = await pool.execute(
        `INSERT INTO medicationschedule (MedicationName, MedicalRecordID) VALUES (?,?)`,
        [medication, newRecordId]
      );

      // Check if the insertion was successful
      if (result.affectedRows === 0) {
        // If no rows were affected, throw an error indicating a failed insertion
        throw {
          statusCode: 500,
          message: "Failed to insert Medication Schedule into the database",
        };
      }

      // Return the insertId
      return result.insertId;
    } catch (error) {
      // Log the error
      console.error("Error adding Medication Schedule to the database:", error.message);

      // Re-throw the error to propagate it up the call stack
      throw error;
    }
  });
};

module.exports = { addMedicationToDb };
