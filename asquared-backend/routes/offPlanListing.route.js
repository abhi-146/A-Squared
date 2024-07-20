const express = require('express');
const router = express.Router();
const offPlanListingController = require('../controllers/offPlanListing.controller');
const authMiddleware = require('../middleware/authMiddleware');
const upload = require('../config/uploadConfig');

// Apply authentication middleware to all routes
// router.use(authMiddleware);

// Define routes
router.post('/', offPlanListingController.createOffPlanListing);
router.post('/bulk', offPlanListingController.createOffPlanListingsBulk);

router.get('/', offPlanListingController.getOffPlanListings);
router.get('/:id', offPlanListingController.getOffPlanListingById);
router.put('/:id', offPlanListingController.updateOffPlanListing);
router.delete('/:id', offPlanListingController.deleteOffPlanListing);
router.delete('/bulk-delete', offPlanListingController.deleteAllOffPlanListing);
router.post('/search', offPlanListingController.searchAndFilterOffPlanListings); 

// Use upload middleware for uploading images
router.post('/upload/displayImages/:id', upload, offPlanListingController.uploadDisplayImages);
router.post('/upload/masterplan/:id', upload, offPlanListingController.uploadMasterplanImages);
router.post('/upload/apartment/:id', upload, offPlanListingController.uploadApartmentFloorImages);
router.post('/upload/penthouse/:id', upload, offPlanListingController.uploadPenthouseFloorImages);
router.post('/upload/townhouse/:id', upload, offPlanListingController.uploadTownhouseFloorImages);
router.post('/upload/duplex/:id', upload, offPlanListingController.uploadDuplexFloorImages);
router.post('/upload/villa/:id', upload, offPlanListingController.uploadVillaFloorImages);

module.exports = router;
