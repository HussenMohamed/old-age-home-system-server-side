const { findUser } = require("../services/users/findUser.js");
const { addTokenToDb } = require("../services/users/refreshToken.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const handleLogin = async (req, res) => {
  try {
    const { username, password } = req.body;
    console.log(username, password);
    if (!username || !password) {
      return res.status(400).json({ message: "Username and Password are required" });
    }

    const foundUser = await findUser(username);
    if (!foundUser) return res.status(401).json({ message: "Username not found" }); // Unauthorized
    //evaluate password
    const match = await bcrypt.compare(password, foundUser.Password);
    if (match) {
      // create JWTs
      const accessToken = jwt.sign(
        { username: foundUser.Username },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "30s" }
      );
      console.log(`from auth controller : ${foundUser.Username}`);
      const refreshToken = jwt.sign(
        { username: foundUser.Username },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: "1d" }
      );

      // add the refresh token to the database
      const addedToken = await addTokenToDb(refreshToken, foundUser.UserID);

      // set cookie with refresh token
      // res.cookie("jwt", refreshToken, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 });
      res.cookie("jwt", refreshToken, {
        httpOnly: true,
        sameSite: "None",
        secure: true,
        maxAge: 24 * 60 * 60 * 1000,
      });

      // send both access and refresh tokens in the response
      res.json({ success: `User ${foundUser.Username} is logged in!`, accessToken });
    } else {
      res.status(401).json({ message: "Wrong password" });
    }
  } catch (error) {
    console.error("Error during login:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = handleLogin;
