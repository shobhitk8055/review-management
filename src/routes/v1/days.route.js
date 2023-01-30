const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const { daysController } = require('../../controllers');
const { phoneValidation } = require('../../validations');

const router = express.Router();

router.route('/').get(auth(), daysController.getDays);

router.route('/:id').get(auth(), daysController.getDay).post(auth(), daysController.updateDay);

router.route('/:id/time-slot').post(auth(), validate(phoneValidation.createTimeSlot), daysController.createTimeSlot);

router
  .route('/:id/time-slot/:timeSlotId')
  .post(auth(), validate(phoneValidation.updateTimeSlot), daysController.updateTimeSlot)
  .delete(auth(), daysController.deleteTimeSlot);

module.exports = router;
