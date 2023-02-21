const { Request, Feedback } = require('../models');

const requestService = {};

/**
 * Get all review requests for admin
 * @returns {Requests[]}
 */
requestService.getRequests = async () => {
  const requests = await Request.find().populate('employee');
  return requests;
};

/**
 * Create a review request
 * @param {Object} payload - request payload
 * @returns {String}
 */
requestService.createRequest = async (payload) => {
  await Request.create(payload);
  return 'success';
};

/**
 * Update a review request
 * @param {ObjectId} id - request id
 * @param {Object} payload - request payload
 * @returns {String}
 */
requestService.updateRequest = async (id, payload) => {
  await Request.findByIdAndUpdate(id, payload);
  return 'success';
};

/**
 * delete a review request and all feedbacks of a request
 * @param {ObjectId} id - request id
 * @returns {String}
 */
requestService.deleteRequest = async (id) => {
  await Request.findOneAndDelete(id);
  await Feedback.deleteMany({ request: id });
  return 'success';
};

/**
 * Assign employee to a review request
 * @param {ObjectId} id - request id
 * @param {ObjectId[]} employeeIds - ids of all employee that need to be assigned
 * @returns {String}
 */
requestService.assignEmployeesToRequest = async (id, employeeIds) => {
  const request = await Request.findById(id);
  const feedbackRequests = employeeIds.map((i) => ({
    request: id,
    reviewer: i,
    employee: request.employee,
  }));
  await Feedback.insertMany(feedbackRequests);
  request.status = 'assigned';
  await request.save();
  return 'success';
};

module.exports = requestService;
