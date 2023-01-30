const httpStatus = require('http-status');
const { User, Phone } = require('../models');
const ApiError = require('../utils/ApiError');

const phoneService = {};

phoneService.getPhones = async () => {
  const phones = await Phone.find();
  return phones;
};

phoneService.createPhone = async (payload) => {
  await Phone.create(payload);
  return 'success';
};

phoneService.updatePhone = async (id, payload) => {
  await Phone.findByIdAndUpdate(id, payload);
  return 'success';
};

phoneService.deletePhone = async (id) => {
  await Phone.findOneAndDelete(id);
  return 'success';
};

module.exports = phoneService;
