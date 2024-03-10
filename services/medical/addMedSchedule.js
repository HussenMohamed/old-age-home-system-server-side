const { pool } = require("../../model/db.config");

const addScheduleTimesToDb = async (newMedicationId, scheduleTimes, days) => {
  scheduleTimes.forEach(async (scheduleTime) => {
    try {
      // Execute the SQL query to insert a new medical record into the database
      days.forEach(async (day) => {
        console.log(
          `Day: ${day} | time: ${scheduleTime.time} | dosage: ${scheduleTime.dosage} | MedicationId: ${newMedicationId}`
        );
        const [result] = await pool.execute(
          `INSERT INTO scheduletime (DayOfTheWeek, Time, Dosage, MedicationID) VALUES (?,?,?,?)`,
          [day, scheduleTime.time, parseFloat(scheduleTime.dosage), newMedicationId]
        );

        // Check if the insertion was successful
        if (result.affectedRows === 0) {
          // If no rows were affected, throw an error indicating a failed insertion
          throw {
            statusCode: 500,
            message: "Failed to insert Schedule Times into the database",
          };
        }
        // Return the insertId
        return result.insertId;
      });
    } catch (error) {
      // Log the error
      console.error("Error adding Schedule Times to the database:", error.message);

      // Re-throw the error to propagate it up the call stack
      throw error;
    }
  });
};

module.exports = { addScheduleTimesToDb };
