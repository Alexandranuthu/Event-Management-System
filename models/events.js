// models/Event.js
const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  name: { type: String, required: true },
  date: { type: Date, required: true },
  location: { type: String, required: true },
  description: { type: String, required: true },
  images: { type: [String] },
  themes: { type: [String] },
  tickets: {
    type: [{
      type: { type: String, required: true },
      price: { type: Number, required: true },
      available_ticket_quantity: { type: Number, required: true }
    }]
  },
  organizer_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  organizerProfile: { type: String, required: true },
  attendees: { type: [String] },
  categories: { type: [String] },
  timestamps: { type: Date, default: Date.now },
  calendarSync: { type: Boolean, default: false },
  status: { type: String, enum: ['scheduled', 'ongoing', 'completed'], default: 'scheduled' }
});

module.exports = mongoose.model('Event', eventSchema);
