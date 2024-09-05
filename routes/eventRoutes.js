const express = require('express');
const router = express.Router();
const eventController = require('../controllers/eventController');

// Define routes and map them to controller methods
router.post('/createevents', eventController.createEvent);
router.get('/getevents', eventController.getAllEvents);
router.get('/:id', eventController.getEventById);
router.put('{id}', eventController.updateEventById);
router.delete('/:id', eventController.deleteEventById);

module.exports = router;
