const { addFeedbackToDb } = require("../services/feedbacks/addNewFeedback.js");

const addShift = async (req, res) => {
  try {
    const { rating, feedbackText } = req.body;
    // check if the rating is more than 5 or less than 0 [Future work]
    const newFeedback = await addFeedbackToDb(rating, feedbackText);
    console.log(`new Feedback ${newFeedback}`);
    return res.status(201).json({ success: `Feedback ${newFeedback} created!` });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

module.exports = addShift;
