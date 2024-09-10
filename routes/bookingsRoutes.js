// routes/bookingRoutes.js
const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/bookingsController');

// Define routes for bookings
router.post('/createbooking', bookingController.createBooking);
router.get('/getbookings', bookingController.getAllBookings);
router.get('/:id', bookingController.getBookingById);
router.put('/:id', bookingController.updateBookingById);
router.delete('/:id', bookingController.deleteBookingById);

module.exports = router;
