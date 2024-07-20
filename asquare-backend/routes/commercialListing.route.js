const express = require('express');
const router = express.Router();
const commercialListingController = require('../controllers/commercialListing.controller'); // Update controller name
const authMiddleware = require('../middleware/authMiddleware');
const upload = require('../config/uploadConfig');

router.get('/', commercialListingController.getCommercialListings); 
router.get('/:id', commercialListingController.getCommercialListingById); 

// router.use(authMiddleware);

router.post('/', commercialListingController.createCommercialListing); 
router.post('/bulkCreate', commercialListingController.createBulkCommercialListings); 
router.delete('/deleteAll', commercialListingController.deleteAllCommercialListings); 
router.put('/:id', commercialListingController.updateCommercialListing); 
router.delete('/:id', commercialListingController.deleteCommercialListing); 
router.post('/search', commercialListingController.searchAndFilterCommercialListings); 
router.post('/upload/:id', upload, commercialListingController.uploadImages); 
router.delete('/delete-image/:id', upload, commercialListingController.deleteImage); 

module.exports = router;
