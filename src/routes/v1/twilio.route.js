const express = require('express');
const { twilioController } = require('../../controllers');

const router = express.Router();

router.route('/').post(twilioController.welcome).get(twilioController.welcome);

module.exports = router;
