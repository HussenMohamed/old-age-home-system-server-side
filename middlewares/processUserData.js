// Middleware function to process user data
const processUserData = (req, res, next) => {
  const {
    username,
    password,
    email,
    phoneNumber,
    role,
    staffRoleId,
    relatedResident,
    relationShip,
  } = req.body;

  // Create userRequest object
  req.userRequest = {
    username,
    password,
    email,
    phoneNumber,
    role,
    staffRoleId,
    relatedResident,
    relationShip,
  };

  // Continue to the next middleware or route handler
  next();
};

module.exports = processUserData;
