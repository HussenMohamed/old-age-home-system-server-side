const { pool } = require("../../model/db.config");

const getCountMedicalRecordsFromDb = async () => {
  try {
    // Execute the SQL query to insert a get family members from the database
    const [result] = await pool.execute(
      `SELECT COUNT(*) AS TotalMedicalRecords FROM medicalrecord;`
    );
    console.log(`From roles query`);
    return result[0];
  } catch (error) {
    return error;
  }
};

module.exports = { getCountMedicalRecordsFromDb };
