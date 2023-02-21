const { Feedback } = require('../models');

const feedbackService = {};

feedbackService.getFeedbacks = async (requestId) => {
  const feedbacks = Feedback.find({
    request: requestId,
  })
    .populate('employee')
    .populate('reviewer');
  return feedbacks;
};

module.exports = feedbackService;
