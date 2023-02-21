const { Request, Feedback } = require('../models');
const { feedbackService } = require('../services');
const catchAsync = require('../utils/catchAsync');

const getFeedbacks = catchAsync(async (req, res) => {
  const id = req.params.requestId;
  const request = await Request.findById(id).populate('employee');
  const feedbacks = await feedbackService.getFeedbacks(id);
  res.json({ employee: request.employee, feedbacks });
});

const getReviewRequests = catchAsync(async (req, res) => {
  const { id } = req.user;
  const requests = await Feedback.find({ reviewer: id }).populate('request').populate('employee');
  res.json(requests);
});

const addFeedback = catchAsync(async (req, res) => {
  const id = req.params.feedbackId;
  await Feedback.findByIdAndUpdate(id, { note: req.body.note, status: 'completed' });
  res.json('success');
});

module.exports = {
  getFeedbacks,
  getReviewRequests,
  addFeedback,
};
