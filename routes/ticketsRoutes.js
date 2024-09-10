const express = require('express');
const router = express.Router();
const ticketController = require('../controllers/ticketsControllers');

// Route to create a new ticket
router.post('/', ticketController.createTicket);

// Route to get all tickets for an event
router.get('/event/:event_id', ticketController.getTicketsByEvent);

// Route to get a single ticket by ID
router.get('/:id', ticketController.getTicketById);

// Route to update a ticket
router.put('/:id', ticketController.updateTicket);

// Route to delete a ticket
router.delete('/:id', ticketController.deleteTicket);

module.exports = router;
