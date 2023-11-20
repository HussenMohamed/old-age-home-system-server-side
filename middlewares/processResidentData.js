// Middleware function to process user data
const processResidentData = (req, res, next) => {
  const {
    name,
    birthDate,
    age,
    nationality,
    UNCN,
    permanentAddress,
    maritalStatus,
    numberOfChildren,
    roomNumber,
  } = req.body;

  // Create userRequest object
  req.resident = {
    name,
    birthDate,
    age,
    nationality,
    UNCN,
    permanentAddress,
    maritalStatus,
    numberOfChildren,
    roomNumber,
  };
  console.log();
  // Continue to the next middleware or route handler
  next();
};

module.exports = processResidentData;
