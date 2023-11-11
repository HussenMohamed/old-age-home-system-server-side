const { pool } = require("../../../model/db.config");
const updateRequestState = async (reqId, reqState) => {
  try {
    console.log("reqId: " + reqId + "reqState: " + reqState);
    const [rows, fields] = await pool.query(
      "UPDATE userrequests SET Status = ? WHERE RequestID = ?",
      [reqState, reqId]
    );
    console.log(rows);
    return rows;
  } catch (err) {
    // Handle any errors that might occur during the database operation
    console.error("Error updating user request:", err.message);
    throw err; // Re-throw the error to let the calling function handle it
  }
};

module.exports = { updateRequestState };
