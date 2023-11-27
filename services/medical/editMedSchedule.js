const { pool } = require("../../model/db.config");

const addMedDosageToDb = async (medicationId, dosage) => {
  try {
    // Execute the SQL query to insert a new Dosage into the database
    const [result] = await pool.execute(
      `UPDATE medicationschedule SET Dosage = ? WHERE MedicationID = ?`,
      [dosage, medicationId]
    );

    // Check if the insertion was successful
    if (result.affectedRows === 0) {
      // If no rows were affected, throw an error indicating a failed insertion
      throw {
        statusCode: 500,
        message: "Failed to insert Dosage into the database",
      };
    }

    // Return the insertId
    return result.insertId;
  } catch (error) {
    // Log the error
    console.error("Error adding Dosage to the database:", error.message);

    // Re-throw the error to propagate it up the call stack
    throw error;
  }
};
const addScheduleTimesToDb = async (medicationId, day, times) => {
  times.forEach(async (time) => {
    try {
      // Execute the SQL query to insert a Schduletime into the database
      const [result] = await pool.execute(
        `INSERT INTO scheduletime (DayOfTheWeek, Time, MedicationID) VALUES (?,?,?)`,
        [day, time, medicationId]
      );

      // Check if the insertion was successful
      if (result.affectedRows === 0) {
        // If no rows were affected, throw an error indicating a failed insertion
        throw {
          statusCode: 500,
          message: "Failed to insert Schduletime into the database",
        };
      }

      // Return the insertId
      return result.insertId;
    } catch (error) {
      // Log the error
      console.error("Error adding Schduletime to the database:", error.message);

      // Re-throw the error to propagate it up the call stack
      throw error;
    }
  });
};
module.exports = { addMedDosageToDb, addScheduleTimesToDb };
