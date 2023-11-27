const {
  addPurchaseReqToDb,
  RequestStateInDb,
} = require("../services/inventory/purchaseRequests.js");
const handlePurchaseRequest = async (req, res) => {
  try {
    const { productID, quantityRequested } = req.body;

    // Post new purchase request
    const purchaseId = await addPurchaseReqToDb(productID, quantityRequested);
    return res.status(201).json({ success: `New Purchase Request ${purchaseId} added` });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: `from Purchase Request Controller => ${err.message}` });
  }
};

const changePurchaseRequestState = async (req, res) => {
  try {
    const purchaseRequestId = req.params.purchaseRequestId;
    const state = req.body.state;
    const newState = await RequestStateInDb(purchaseRequestId, state);
    if (!newState) return res.status(500).json({ success: `couldn not change the state` });
    return res.status(201).json({ success: `Purchase Request State Changed to ${state}` });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: `from Purchase Request Controller => ${err.message}` });
  }
};
module.exports = { handlePurchaseRequest, changePurchaseRequestState };
