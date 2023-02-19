const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createRequest = {
  body: Joi.object().keys({
    note: Joi.string().required(),
    employee: Joi.string().required(),
  }),
};

const updateRequest = {
  params: Joi.object().keys({
    id: Joi.string().custom(objectId),
  }),
  body: Joi.object().keys({
    note: Joi.string().required(),
    employee: Joi.string().required(),
  }),
};

const assignEmployees = {
  params: Joi.object().keys({
    id: Joi.string().custom(objectId),
  }),
  body: Joi.object().keys({
    employeeIds: Joi.array(),
  }),
};

const addFeedback = {
  params: Joi.object().keys({
    feedbackId: Joi.string().custom(objectId),
  }),
  body: Joi.object().keys({
    note: Joi.string().required(),
  }),
};

module.exports = {
  createRequest,
  updateRequest,
  assignEmployees,
  addFeedback
};
