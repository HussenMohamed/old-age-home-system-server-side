const { addRoomToDb } = require("../services/rooms/addNewRoom.js");
const { getAvailableRoomsFromDb } = require("../services/rooms/getAvailableRoomsFromDb.js");

const addRoom = async (req, res) => {
  try {
    const { roomNumber, roomType, occupancy, maxCapacity } = req.body;
    // check if the room is already in use [Future work]
    const newRoom = await addRoomToDb(roomNumber, roomType, occupancy, maxCapacity);
    console.log(`new room with id ${newRoom}`);
    return res.status(201).json({ success: `Room ${newRoom} created!` });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getAvailableRooms = async (req, res) => {
  try {
    // check if the room is already in use [Future work]
    const rooms = await getAvailableRoomsFromDb();
    return res.status(200).json(rooms);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { addRoom, getAvailableRooms };
