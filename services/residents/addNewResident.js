const { pool } = require("../../model/db.config");

const addResidentToDb = async (resident) => {
  try {
    const {
      name,
      birthDate,
      age,
      nationality,
      UNCN,
      permanentAddress,
      maritalStatus,
      numberOfChildren,
      roomNumber,
      ResponsibleStaffID,
    } = resident ?? {};
    const [result] = await pool.execute(
      `INSERT INTO resident (Name, BirthDate, Age, Nationality, UNCN, PermanentAddress, MaritalStatus, NumberOfChildren, RoomNumber, hasMedicalRecord, ResponsibleStaffID) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, false, ?)`,
      [
        name,
        birthDate,
        age,
        nationality,
        UNCN,
        permanentAddress,
        maritalStatus,
        numberOfChildren,
        roomNumber,
        ResponsibleStaffID,
      ]
    );

    if (result.affectedRows === 1) {
      console.log("Data inserted successfully.");
      // now increment the occupancy of the room by one
      const [result2] = await pool.execute(
        `UPDATE room SET Occupancy = Occupancy + 1 WHERE RoomNumber = ?`,
        [roomNumber]
      );
    } else {
      console.log("Failed to insert data.");
    }
    const insertedResidentId = result.insertId;

    // You can return the inserted resident ID or any other relevant information
    return { residentId: insertedResidentId, message: "Resident added successfully" };
  } catch (error) {
    // Handle any error that might occur during the database query
    console.error("Error adding resident:", error.message);
    throw error; // Re-throw the error to let the calling function handle it
  }
};

module.exports = { addResidentToDb };
