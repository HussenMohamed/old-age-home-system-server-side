// const { pool } = require("../../../model/db.config");
// const acceptUser = async (reqId) => {
//   const [rows] = await pool.query("SELECT Role FROM userrequests WHERE RequestID = ?", [reqId]);
//   const role = rows[0].Role; // Staff or Family Member
//   console.log(role);
//   const [insertRows] = await pool.query(
//     `INSERT INTO User (Username, Password, Email, PhoneNumber, Role)
//         SELECT Username, Password, Email, PhoneNumber, Role
//         FROM UserRequests
//         WHERE RequestID = ?`,
//     [reqId]
//   );
//   return insertRows.insertId;
// };

// module.exports = { acceptUser };

const { pool } = require("../../../model/db.config");

const acceptUser = async (reqId) => {
  try {
    // Fetch the role from the userrequests table
    const [rows] = await pool.query("SELECT Role FROM userrequests WHERE RequestID = ?", [reqId]);

    // Check if the user request is found
    if (rows.length === 0) {
      throw { statusCode: 404, message: "User request not found" };
    }

    const role = rows[0].Role.toLowerCase(); // staff or familymember

    // Insert the user into the User table
    const [userRows] = await pool.query(
      `INSERT INTO User (Username, Password, Email, PhoneNumber, Role)
        SELECT Username, Password, Email, PhoneNumber, Role
        FROM UserRequests
        WHERE RequestID = ?`,
      [reqId]
    );
    const userId = userRows.insertId;
    // Check if the insertion was successful
    if (userRows.affectedRows === 0) {
      throw { statusCode: 500, message: "Failed to insert user into User table" };
    }

    // Insert the user into the Role table
    const [roleRows] = await pool.query(
      `INSERT INTO ${role} (Name, PhoneNumber, user_UserID)
        SELECT Username, PhoneNumber, UserID
        FROM user
        WHERE UserID = ?`,
      [userId]
    );

    // Check if the insertion was successful
    if (roleRows.affectedRows === 0) {
      throw { statusCode: 500, message: "Failed to insert user into their role table" };
    }

    // Return the insertId
    return [userRows.insertId, roleRows.insertId];
  } catch (error) {
    // Log the error
    console.error("Error accepting user request:", error.message);

    // Re-throw the error to propagate it up the call stack
    throw error;
  }
};

module.exports = { acceptUser };
