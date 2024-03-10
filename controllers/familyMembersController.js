const { addFamilyMemberToDb } = require("../services/familyMembers/addFamilyMemberToDb.js");
const { getFamilyMembersFromDb } = require("../services/familyMembers/getFamilyMembersFromDb.js");

const addFamilyMember = async (req, res) => {
  try {
    const { familyMemberName, residentId, relationship, phoneNumber, email } = req.body;
    const newFamilyMember = await addFamilyMemberToDb(
      familyMemberName,
      residentId,
      relationship,
      phoneNumber,
      email
    );
    console.log(`new Family Member ${newFamilyMember}`);
    return res.status(201).json({ success: `Family Member with ID ${newFamilyMember} Added!` });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

const getFamilyMembers = async (req, res) => {
  try {
    const familyMembers = await getFamilyMembersFromDb();
    console.log(familyMembers);
    res.status(200).json(familyMembers);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

module.exports = { addFamilyMember, getFamilyMembers };
