const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { requestService } = require('../services');

const getRequests = catchAsync(async (req, res) => {
  const requests = await requestService.getRequests();
  res.status(httpStatus.OK).send(requests);
});

const createRequest = catchAsync(async (req, res) => {
  await requestService.createRequest(req.body);
  res.status(httpStatus.CREATED).send('success');
});

const updateRequest = catchAsync(async (req, res) => {
  await requestService.updateRequest(req.params.id, req.body);
  res.status(httpStatus.CREATED).send('success');
});

const deleteRequest = catchAsync(async (req, res) => {
  await requestService.deleteRequest(req.params.id);
  res.status(httpStatus.OK).send('success');
});

const assignEmployees = catchAsync(async (req, res) => {
  await requestService.assignEmployeesToRequest(req.params.id, req.body.employeeIds);
  res.status(httpStatus.OK).send('success');
});

module.exports = {
  getRequests,
  createRequest,
  updateRequest,
  deleteRequest,
  assignEmployees,
};
