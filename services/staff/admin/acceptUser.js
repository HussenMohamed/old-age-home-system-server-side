const { pool } = require("../../../model/db.config");
const acceptUser = async (userId) => {
  try {
    // Fetch the role from the userrequests table
    const [rows] = await pool.query("SELECT Role FROM user WHERE UserID = ?", [userId]);
    console.log("__________________________________");
    console.log(rows);
    console.log("__________________________________");
    // SELECT Status FROM user WHERE UserID = ?
    // Check if the user request is found
    if (rows.length === 0) {
      throw { statusCode: 404, message: "User not found" };
    }

    const role = rows[0].Role.toLowerCase(); // staff or familymember
    const query =
      role === "staff"
        ? `INSERT INTO staff (Name, PhoneNumber, UserID, RoleID)
            SELECT Username, PhoneNumber, UserID, StaffRoleID
            FROM user
            WHERE UserID = ?`
        : `INSERT INTO familymember (Name, PhoneNumber, Relationship, ResidentID, UserID)
            SELECT Username, PhoneNumber, Relationship, RelatedResidentID, UserID
            FROM user
            WHERE UserID = ?`;
    // Insert the user into the their Role table
    const [roleRows] = await pool.query(query, [userId]);

    // Check if the insertion was successful
    if (roleRows.affectedRows === 0) {
      throw { statusCode: 500, message: "Failed to insert user into their role table" };
    }

    // Return the insertId
    return [roleRows.insertId];
  } catch (error) {
    // Log the error
    console.error("Error accepting user request:", error.message);

    // Re-throw the error to propagate it up the call stack
    throw error;
  }
};

module.exports = { acceptUser };
