const express = require('express');
const router = express.Router();
const contactUsUsersController = require('../controllers/contactUsUsers.controller');

router.post('/', contactUsUsersController.addContactUsUser);
router.get('/', contactUsUsersController.getAllContactUsUsers);

module.exports = router;
