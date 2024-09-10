// models/EventSchedule.js
const mongoose = require('mongoose');

const eventScheduleSchema = new mongoose.Schema({
  event_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Event', required: true },
  start_time: { type: Date, required: true },
  end_time: { type: Date, required: true },
  activity: { type: String, required: true },
  location: { type: String, required: true },
  timestamps: { type: Date, default: Date.now }
});

module.exports = mongoose.model('EventSchedule', eventScheduleSchema);
