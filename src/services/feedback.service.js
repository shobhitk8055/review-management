const { Feedback } = require('../models');

const feedbackService = {};

/**
 * Get all feedbacks of a review request
 * @param {objectId} requestId
 * @returns {Promise}
 */
feedbackService.getFeedbacks = async (requestId) => {
  const feedbacks = Feedback.find({
    request: requestId,
  })
    .populate('employee')
    .populate('reviewer');
  return feedbacks;
};

module.exports = feedbackService;
