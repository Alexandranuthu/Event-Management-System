const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema({
  type: { type: String, required: true },
  price: { type: Number, required: true },
  event_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Event', required: true },
  available_ticket_quantity: { type: Number, required: true },
});

module.exports = mongoose.model('Ticket', ticketSchema);