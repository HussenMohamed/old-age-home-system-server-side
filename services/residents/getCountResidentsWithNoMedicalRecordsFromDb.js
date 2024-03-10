const { pool } = require("../../model/db.config");

const getCountResidentsWithNoMedicalRecordsFromDb = async () => {
  try {
    // Execute the SQL query to insert a get family members from the database
    const [result] = await pool.execute(
      `SELECT COUNT(*) AS ResidentsWithoutMedicalRecord FROM resident r LEFT JOIN medicalrecord m ON r.ResidentID = m.ResidentID WHERE m.ResidentID IS NULL;`
    );
    console.log(`From roles query`);
    return result[0];
  } catch (error) {
    return error;
  }
};

module.exports = { getCountResidentsWithNoMedicalRecordsFromDb };
