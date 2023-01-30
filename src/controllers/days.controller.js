const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { daysService, phoneService } = require('../services');

const getDays = catchAsync(async (req, res) => {
  const days = await daysService.getDays();
  res.status(httpStatus.OK).send(days);
});

const getDay = catchAsync(async (req, res) => {
  const day = await daysService.getDay(req.params.id);
  res.status(httpStatus.OK).send(day);
});

const updateDay = catchAsync(async (req, res) => {
  await daysService.updateDay(req.params.id, req.body);
  res.status(httpStatus.CREATED).send('success');
});

const createTimeSlot = catchAsync(async (req, res) => {
  await daysService.createTimeSlot(req.params.id, req.body);
  res.status(httpStatus.CREATED).send('success');
});

const updateTimeSlot = catchAsync(async (req, res) => {
  await daysService.updateTimeSlot(req.params.timeSlotId, req.body);
  res.status(httpStatus.CREATED).send('success');
});

const deleteTimeSlot = catchAsync(async (req, res) => {
  await daysService.deleteTimeSlot(req.params.timeSlotId);
  res.status(httpStatus.OK).send('success');
});

module.exports = {
  getDays,
  getDay,
  updateDay,
  createTimeSlot,
  updateTimeSlot,
  deleteTimeSlot,
};
