const { pool } = require("../../model/db.config");

const completeTaskInDb = async (taskId) => {
  try {
    // Execute the SQL query to insert a new shift into the database
    const [result] = await pool.execute(
      `UPDATE tasks SET isCompleted = 1, CompletionTime = NOW() WHERE TaskID = ?`,
      [taskId]
    );

    // Check if the update was successful
    if (result.affectedRows === 0) {
      // If no rows were affected, throw an error indicating a failed insertion
      throw { statusCode: 500, message: "Failed to insert task into the database" };
    }

    // Return the insertId
    return result.insertId;
  } catch (error) {
    // Log the error
    console.error("Error updating task to the database:", error.message);

    // Re-throw the error to propagate it up the call stack
    throw error;
  }
};

module.exports = { completeTaskInDb };
