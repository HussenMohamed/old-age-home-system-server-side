const { pool } = require("../../model/db.config");

const getResidentsWithNoMedicalRecordsFromDb = async () => {
  try {
    // Execute the SQL query to insert a get roles from the database
    const [result] = await pool.execute(
      `SELECT r.ResidentID, r.Name, r.Age FROM resident r LEFT JOIN medicalrecord m ON r.ResidentID = m.ResidentID WHERE m.ResidentID IS NULL;`
    );

    console.log(`From getResidentsWithNoMedicalRecordsFromDb query`);
    return result;
  } catch (error) {
    return error;
  }
};

module.exports = { getResidentsWithNoMedicalRecordsFromDb };
