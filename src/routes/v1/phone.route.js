const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const userController = require('../../controllers/user.controller');
const { phoneController } = require('../../controllers');
const { phoneValidation } = require('../../validations');

const router = express.Router();

router
  .route('/')
  .post(auth(), validate(phoneValidation.createPhone), phoneController.createPhone)
  .get(auth(), phoneController.getPhones);

router
  .route('/:id')
  .post(auth(), validate(phoneValidation.updatePhone), phoneController.updatePhone)
  .delete(auth(), phoneController.deletePhone);

module.exports = router;
