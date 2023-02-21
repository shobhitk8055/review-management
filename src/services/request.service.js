const { Request, Feedback } = require('../models');

const requestService = {};

requestService.getRequests = async () => {
  const requests = await Request.find().populate('employee');
  return requests;
};

requestService.createRequest = async (payload) => {
  await Request.create(payload);
  return 'success';
};

requestService.updateRequest = async (id, payload) => {
  await Request.findByIdAndUpdate(id, payload);
  return 'success';
};

requestService.deleteRequest = async (id) => {
  await Request.findOneAndDelete(id);
  await Feedback.deleteMany({ request: id });
  return 'success';
};

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
