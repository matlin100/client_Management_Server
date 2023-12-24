const express = require('express');
const router = express.Router();
const customerController = require('../controllers/customerController');

router.post('/submit', customerController.handleCustomerSubmission);

module.exports = router;
