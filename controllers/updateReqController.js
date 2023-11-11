const { updateRequestState } = require("../services/staff/admin/updateReqState.js");
const handleUserRequest = async (req, res) => {
  try {
    if (!(req?.params?.reqId || req?.body?.reqState)) {
      return res.status(400).json({ message: "User request id and state are required" });
    }
    console.log("req.params: " + req.params);
    const reqId = req.params.reqId;
    const { reqState } = req.body;

    const updatedRows = await updateRequestState(reqId, reqState);

    if (updatedRows && updatedRows.affectedRows > 0) {
      return res.status(200).json({ message: "User request approved successfully" });
    } else {
      return res.status(404).json({ message: "User request not found" });
    }
  } catch (error) {
    // Handle any unexpected errors
    console.error("Error handling User Request:", error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { handleUserRequest };
