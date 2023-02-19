const { Phone, Feedback, TimeSlot } = require('../models');
const ApiError = require('../utils/ApiError');

const feedbackService = {};

feedbackService.getFeedbacks = async (requestId) => {
  const feedbacks = Feedback.find({
    request: requestId,
  }).populate('employee').populate('reviewer');
  return feedbacks;
};

module.exports = feedbackService;
