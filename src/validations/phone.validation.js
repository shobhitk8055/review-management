const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createPhone = {
  body: Joi.object().keys({
    phone_number: Joi.string().required(),
  }),
};

const updatePhone = {
  params: Joi.object().keys({
    id: Joi.string().custom(objectId),
  }),
  body: Joi.object().keys({
    phone_number: Joi.string().required(),
  }),
};

const createTimeSlot = {
  params: Joi.object().keys({
    id: Joi.string().custom(objectId),
  }),
  body: Joi.object().keys({
    phone_number: Joi.string().required(),
    time_from: Joi.string().required(),
    time_to: Joi.string().required(),
  }),
};

const updateTimeSlot = {
  params: Joi.object().keys({
    id: Joi.string().custom(objectId),
    timeSlotId: Joi.string().custom(objectId),
  }),
  body: Joi.object().keys({
    phone_number: Joi.string(),
    time_from: Joi.string(),
    time_to: Joi.string(),
  }),
};

module.exports = {
  createPhone,
  updatePhone,
  createTimeSlot,
  updateTimeSlot,
};
