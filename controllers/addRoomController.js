const { addRoomToDb } = require("../services/rooms/addNewRoom.js");

const addRoom = async (req, res) => {
  try {
    const { roomNumber, roomType, occupancy } = req.body;
    // check if the room is already in use [Future work]
    const newRoom = await addRoomToDb(roomNumber, roomType, occupancy);
    console.log(`new room with id ${newRoom}`);
    return res.status(201).json({ success: `Room ${newRoom} created!` });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = addRoom;
