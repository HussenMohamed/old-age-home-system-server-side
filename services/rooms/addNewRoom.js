const { pool } = require("../../model/db.config");

const addRoomToDb = async (roomNumber, roomType, occupancy, maxCapacity) => {
  const [result] = await pool.execute(
    `INSERT INTO room (RoomNumber, RoomType, Occupancy, MaxCapacity) VALUES (?,?,?,?)`,
    [roomNumber, roomType, occupancy, maxCapacity]
  );
  return result.insertId;
};

module.exports = { addRoomToDb };
