// models/Event.js
const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  images: [String],
  themes: [String],
  tickets: [///////////////////////////////////////////////////////////////
    {
      type: {
        type: String,
        required: true,
      },
      price: {
        type: Number,
        required: true,
      },
      available: {
        type: Number,
        required: true,
      },
    },
  ],
  organizer: {///////////////////////////////////////////////////////////////
    type: String,
    required: true,
  },
  organizerProfile: {
    type: String,
    required: true,
  },
  attendees: [
    {
      userId: String,
      status: String,
      checkedIn: {
        type: Boolean,
        default: false,
      },
    },
  ],
  categories: [String],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  calendarSync: {
    type: Boolean,
    default: false,
  },
});

const Event = mongoose.model('Event', eventSchema);
module.exports = Event;
