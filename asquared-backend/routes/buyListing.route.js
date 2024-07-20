const express = require('express');
const router = express.Router();
const buyListingController = require('../controllers/buyListing.controller');
const authMiddleware = require('../middleware/authMiddleware');
const upload = require('../config/uploadConfig');

router.get('/', buyListingController.getBuyListings);
router.get('/:id', buyListingController.getBuyListingById);

router.use(authMiddleware);

router.post('/', buyListingController.createBuyListing);
router.post('/bulkCreate', buyListingController.createBulkBuyListings);
router.delete('/deleteAll', buyListingController.deleteAllBuyListings);
router.put('/:id', buyListingController.updateBuyListing);
router.delete('/:id', buyListingController.deleteBuyListing);
router.post('/search', buyListingController.searchAndFilterBuyListings);
router.post('/upload/:id', upload, buyListingController.uploadImages);
router.delete('/delete-image/:id', upload, buyListingController.deleteImage);

module.exports = router;
