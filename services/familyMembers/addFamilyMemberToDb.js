const { pool } = require("../../model/db.config");

const addFamilyMemberToDb = async (
  familyMemberName,
  residentId,
  relationship,
  phoneNumber,
  email
) => {
  try {
    // Execute the SQL query to insert a new role into the database
    const [result1] = await pool.execute(
      `INSERT INTO user (username, email, PhoneNumber, Relationship, RelatedResidentID, Role, Status, Password) VALUES (?,?,?,?,?,?,?,?)`,
      [
        familyMemberName,
        email,
        phoneNumber,
        relationship,
        residentId,
        "FamilyMember",
        "Accepted",
        "0000",
      ]
    );

    // Check if the insertion was successful
    if (result1.affectedRows === 0) {
      // If no rows were affected, throw an error indicating a failed insertion
      throw { statusCode: 500, message: "Failed to insert familyMember into the users table" };
    }
    // Execute the SQL query to insert a new role into the database
    const [result2] = await pool.execute(
      `INSERT INTO familymember (Name, PhoneNumber, Relationship, residentID, UserID) VALUES (?,?,?,?,?)`,
      [familyMemberName, phoneNumber, relationship, residentId, result1.insertId]
    );
    // Check if the insertion was successful
    if (result2.affectedRows === 0) {
      // If no rows were affected, throw an error indicating a failed insertion
      throw {
        statusCode: 500,
        message: "Failed to insert familyMember into the family members table",
      };
    }
    // Return the insertId
    return result2.insertId;
  } catch (error) {
    // Log the error
    console.error("Error adding role to the database:", error.message);

    // Re-throw the error to propagate it up the call stack
    throw error;
  }
};

module.exports = { addFamilyMemberToDb };
