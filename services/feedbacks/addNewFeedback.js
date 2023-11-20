const { pool } = require("../../model/db.config");
const addFeedbackToDb = async (rating, feedbackText) => {
  try {
    // Execute the SQL query to insert a new shift into the database
    const [result] = await pool.execute(
      `INSERT INTO feedback (rating, feedbackText) VALUES (?,?)`,
      [rating, feedbackText]
    );

    // Check if the insertion was successful
    if (result.affectedRows === 0) {
      // If no rows were affected, throw an error indicating a failed insertion
      throw { statusCode: 500, message: "Failed to insert feedback into the database" };
    }

    // Return the insertId
    return result.insertId;
  } catch (error) {
    // Log the error
    console.error("Error adding feedback to the database:", error.message);

    // Re-throw the error to propagate it up the call stack
    throw error;
  }
};

module.exports = { addFeedbackToDb };
