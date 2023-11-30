const { findRefreshToken, deleteToken } = require("../services/users/refreshToken.js");

const handleLogout = async (req, res) => {
  // on the client side , delete the access token from memory
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(204); // No cookies so the operation is successful
  // get the refresh token
  const refreshToken = cookies.jwt;
  // Is refresh token in Db ?
  const foundUser = await findRefreshToken(refreshToken);
  // did not find user but there is a cookie
  if (!foundUser) {
    res.clearCookie("jwt", { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 });
    return res.sendStatus(204); // Successfull but no content
  } // Forbidden

  // delete the refresh token in the databse
  const deletedToken = await deleteToken(refreshToken);
  //   res.clearCookie("jwt", { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 });
  res.clearCookie("jwt", { httpOnly: true, sameSite: "None", secure: true });
  return res.sendStatus(204); // Successfull but no content
};

module.exports = handleLogout;
