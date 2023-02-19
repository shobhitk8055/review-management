const express = require('express');
const { feedbackController } = require('../../controllers');
const { requestValidation } = require('../../validations');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');

const router = express.Router();

router.route('/').get(auth(), feedbackController.getReviewRequests);

router
  .route('/:requestId')
  .get(feedbackController.getFeedbacks);

  router
  .route('/:feedbackId')
  .post(validate(requestValidation.addFeedback), feedbackController.addFeedback);

module.exports = router;
