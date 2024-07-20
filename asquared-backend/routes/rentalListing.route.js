const express = require('express');
const router = express.Router();
const rentalListingController = require('../controllers/rentalListing.controller');
const authMiddleware = require('../middleware/authMiddleware');
const upload = require('../config/uploadConfig');

router.post('/', rentalListingController.createRentalListing);
router.post('/bulkCreate', rentalListingController.createBulkRentalListings);
router.delete('/deleteAll',rentalListingController.deleteAllRentalListings);
router.get('/', rentalListingController.getRentalListings);
router.get('/:id', rentalListingController.getRentalListingById);
router.put('/:id', rentalListingController.updateRentalListing);
router.delete('/:id', rentalListingController.deleteRentalListing);
router.post('/search', rentalListingController.searchAndFilterRentalListings); 
router.post('/upload/:id', upload, rentalListingController.uploadImages);
router.delete('/delete-image/:id', upload, rentalListingController.deleteImage);

module.exports = router;
