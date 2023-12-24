// customerService.js in routes

const router = require('express').Router();
const customerController = require('../controllers/customerController');

router.post('/submit-info', customerController.submitInfo);

module.exports = router;
