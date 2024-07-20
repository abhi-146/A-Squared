const express = require('express');
const router = express.Router();
const tourRequestController = require('../controllers/tourRequest.controller');

router.get('/', tourRequestController.getAllTourRequests);
router.post('/', tourRequestController.createTourRequest);


module.exports = router;
