const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const { requestController } = require('../../controllers');
const { requestValidation } = require('../../validations');

const router = express.Router();

router
  .route('/')
  .post(auth(), validate(requestValidation.createRequest), requestController.createRequest)
  .get(auth(), requestController.getRequests);

router.route('/assign/:id').post(auth(), validate(requestValidation.assignEmployees), requestController.assignEmployees);

router
  .route('/:id')
  .post(auth(), validate(requestValidation.updateRequest), requestController.updateRequest)
  .delete(auth(), requestController.deleteRequest);

module.exports = router;
