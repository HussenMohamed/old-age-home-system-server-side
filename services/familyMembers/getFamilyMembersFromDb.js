const { pool } = require("../../model/db.config");

const getFamilyMembersFromDb = async () => {
  try {
    // Execute the SQL query to insert a get roles from the database
    const [result] = await pool.execute(
      `SELECT fm.FamilyMemberID, fm.Name AS FamilyMemberName, fm.PhoneNumber, fm.Relationship, r.Name AS ResidentName FROM familymember fm JOIN resident r ON fm.ResidentID = r.ResidentID;`
    );
    console.log(`From roles query`);
    return result;
  } catch (error) {
    return error;
  }
};

module.exports = { getFamilyMembersFromDb };
