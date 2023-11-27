// Import necessary functions from the service module
const { updateRequestState, acceptUser } = require("../services/service.js");

// Handle user request
const handleUserRequest = async (req, res) => {
  try {
    // Check if request parameters are provided
    if (!(req?.params?.reqId || req?.body?.reqState)) {
      return res.status(400).json({ message: "User request id and state are required" });
    }

    // Extract request parameters
    const reqId = req.params.reqId;
    const { reqState } = req.body;

    // Update the request state in the database
    const updatedRows = await updateRequestState(reqId, reqState);
    // state validation to ensure that the user state is already pending
    if (updatedRows === -1) {
      res.status(409).json({ message: "Not pending user" });
    } else if (updatedRows && updatedRows.affectedRows > 0) {
      // Check if the request was found and updated successfully
      // Perform action based on the request state
      await handleUserRequestAction(res, reqState, reqId);
    } else {
      // Return a 404 response if the request was not found
      return res.status(404).json({ message: "User request not found" });
    }
  } catch (error) {
    // Handle any unexpected errors
    console.error("Error handling User Request:", error.message);

    // Check if it's a known error or an unexpected one
    const statusCode = error.statusCode || 500;
    const errorMessage = error.message || "Internal server error";

    // Return an error response with appropriate status code and message
    return res.status(statusCode).json({ message: errorMessage });
  }
};

// Handle user request action based on the request state
const handleUserRequestAction = async (res, reqState, reqId) => {
  if (reqState === "Accepted") {
    // If the request is accepted, add the user to the system
    const userId = await acceptUser(reqId);
    return res.status(200).json({
      message: `User request Accepted successfully and added to the users and apropriate Role table`,
    });
  } else {
    // If the request is refused, return a success response
    return res.status(200).json({ message: `User request Refused successfully` });
  }
};

// Export the handleUserRequest function for use in other modules
module.exports = { handleUserRequest };
