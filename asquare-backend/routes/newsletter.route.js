// routes/newsletter.route.js
const express = require('express');
const router = express.Router();
const newsletterController = require('../controllers/newsletter.controller');

router.post('/', newsletterController.createSubscriber);
router.get('/', newsletterController.getSubscribers);
router.put('/:id', newsletterController.updateSubscriber);
router.delete('/:id', newsletterController.deleteSubscriber);

module.exports = router;
