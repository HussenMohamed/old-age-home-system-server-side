const { pool } = require("../../model/db.config");

const addRoomToDb = async (roomNumber, roomType, occupancy) => {
  const [result] = await pool.execute(
    `INSERT INTO room (RoomNumber, RoomType, Occupancy) VALUES (?,?,?)`,
    [roomNumber, roomType, occupancy]
  );
  return result.insertId;
};

module.exports = { addRoomToDb };
