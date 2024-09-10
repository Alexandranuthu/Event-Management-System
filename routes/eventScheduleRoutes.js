const express = require('express');
const router = express.Router();
const eventScheduleController = require('../controllers/eventScheduleController');

// Define routes for event schedules
router.post('/createeventschedule', eventScheduleController.createEventSchedule);
router.get('/geteventschedules', eventScheduleController.getAllEventSchedules);
router.get('/:id', eventScheduleController.getEventScheduleById);
router.put('/:id', eventScheduleController.updateEventScheduleById);
router.delete('/:id', eventScheduleController.deleteEventScheduleById);

module.exports = router;
