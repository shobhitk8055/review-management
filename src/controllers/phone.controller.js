const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { phoneService } = require('../services');

const getPhones = catchAsync(async (req, res) => {
  const phones = await phoneService.getPhones();
  res.status(httpStatus.OK).send(phones);
});

const createPhone = catchAsync(async (req, res) => {
  await phoneService.createPhone(req.body);
  res.status(httpStatus.CREATED).send('success');
});

const updatePhone = catchAsync(async (req, res) => {
  await phoneService.updatePhone(req.params.id, req.body);
  res.status(httpStatus.CREATED).send('success');
});

const deletePhone = catchAsync(async (req, res) => {
  await phoneService.deletePhone(req.params.id);
  res.status(httpStatus.CREATED).send('success');
});

module.exports = {
  getPhones,
  createPhone,
  updatePhone,
  deletePhone,
};
