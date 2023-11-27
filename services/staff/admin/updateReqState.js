const { pool } = require("../../../model/db.config");
const updateRequestState = async (reqId, reqState) => {
  try {
    if ((await getOriginalStatus(reqId)) != "Pending") return -1;
    const [rows, fields] = await pool.query("UPDATE user SET Status = ? WHERE UserID = ?", [
      reqState,
      reqId,
    ]);
    console.log(`Updating user request state is Done!`);
    return rows;
  } catch (err) {
    // Handle any errors that might occur during the database operation
    console.error("Error updating user status:", err.message);
    throw err; // Re-throw the error to let the calling function handle it
  }
};

const getOriginalStatus = async (reqId) => {
  const [rows, fields] = await pool.query("SELECT Status FROM user WHERE UserID = ?", [reqId]);
  console.log("Original status: " + rows[0].Status);
  return rows[0].Status;
};
module.exports = { updateRequestState };
