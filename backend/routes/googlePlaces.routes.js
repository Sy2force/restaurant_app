const express = require('express');
const router = express.Router();
const googlePlacesController = require('../controllers/googlePlaces.controller');
const { auth, isAdmin, isBusiness } = require('../middleware/auth');

/**
 * Rate limiting for Google Places API calls
 * Prevents abuse and manages API costs
 */
const rateLimit = require('express-rate-limit');

const googlePlacesRateLimit = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 50, // 50 requests per window
  message: 'Too many requests to Google Places API, please try again later',
  standardHeaders: true,
  legacyHeaders: false,
});

const importRateLimit = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 10, // 10 imports per hour
  message: 'Too many import requests, please try again later',
  standardHeaders: true,
  legacyHeaders: false,
});

// Public endpoints (no authentication required)
router.get('/search', googlePlacesRateLimit, googlePlacesController.searchPlaces);
router.get('/details/:placeId', googlePlacesRateLimit, googlePlacesController.getPlaceDetails);
router.get('/photo', googlePlacesRateLimit, googlePlacesController.getPlacePhoto);

// Protected endpoints (require authentication)
router.get('/stats', auth, isAdmin, googlePlacesController.getImportStats);

// Import endpoints (require business or admin)
router.post('/import/:placeId', auth, isBusiness, importRateLimit, googlePlacesController.importPlace);
router.post('/bulk-import', auth, isAdmin, importRateLimit, googlePlacesController.bulkImport);
router.post('/import-by-city', auth, isAdmin, importRateLimit, googlePlacesController.importByCity);
router.post('/import-plan', auth, isAdmin, importRateLimit, googlePlacesController.importPlan);

module.exports = router;
