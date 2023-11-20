const { addRoleToDb } = require("../services/roles/addNewRole.js");

const addRole = async (req, res) => {
  try {
    const { roleName, roleDescription } = req.body;
    // check if the room is already in use [Future work]
    const newRole = await addRoleToDb(roleName, roleDescription);
    return res.status(201).json({ success: `Role ${newRole}: ${roleName}` });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

module.exports = addRole;
