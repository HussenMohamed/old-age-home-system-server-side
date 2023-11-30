const bcrypt = require("bcrypt");
const { checkDuplicate, createUserRequest } = require("../services/service.js");

const handleNewUser = async (req, res) => {
  try {
    const { userRequest } = req;

    // // Check if any value in the userRequest object is falsy (not existing)
    // if (Object.values(userRequest).some((value) => !value)) {
    //   // If any value is falsy, return a 400 status with an error message
    //   return res.status(400).json({ message: "All fields are required" });
    // }

    // Check for duplicate usernames in the database
    if (await checkDuplicate(userRequest)) {
      return res.status(409).json({ message: "Duplicate users" }); // conflict HTTP code
    }

    // Create new user
    const hashedPwd = await bcrypt.hash(userRequest.password, 10);
    userRequest.password = hashedPwd;
    // const user = {
    //   username: userRequest.username,
    //   password: hashedPwd,
    //   email: userRequest.email,
    //   phoneNumber: userRequest.phoneNumber,
    //   role: userRequest.role,
    // };
    console.log("____________________THIS IS USER REQUEST_________________________________");
    console.log(userRequest);
    console.log("_____________________________________________________");
    await createUserRequest(userRequest);
    res.status(201).json({ success: `New user Request From ${userRequest.username} ` });
  } catch (error) {
    console.error("Error handling new user:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = { handleNewUser };
