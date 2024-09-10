
const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  event_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Event', required: true },
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  booking_date: { type: Date, default: Date.now },
  ticket_quantity: { type: Number, required: true }
});

module.exports = mongoose.model('Booking', bookingSchema);