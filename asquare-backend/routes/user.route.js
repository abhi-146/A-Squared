const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');

// POST - Create a new user
router.post('/signup', userController.signup);
router.post('/signin', userController.signin);

// GET - Retrieve a user by ID
router.get('/:id', userController.getUserById);

// PUT - Update a user by ID
router.put('/:id', userController.updateUser);

// DELETE - Delete a user by ID
router.delete('/:id', userController.deleteUser);

// POST - Add a liked listing to a user
router.post('/add-liked-listing', userController.addLikedListing);

// DELETE - Remove a liked listing from a user
router.delete('/:userId/remove-liked-listing/:listingId', userController.removeLikedListing);

module.exports = router;
