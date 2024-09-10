const axios = require('axios');
const endpointUrl = 'https://ap-south-1.aws.data.mongodb-api.com/app/application-0-kucgxyr/endpoint/EventsSchedule';

// Create an Event Schedule
exports.createEventSchedule = async (req, res) => {
  try {
    const response = await axios.post(endpointUrl, req.body);
    res.status(201).json(response.data);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all Event Schedules
exports.getAllEventSchedules = async (req, res) => {
  try {
    const response = await axios.get(endpointUrl);
    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get Event Schedule by ID
exports.getEventScheduleById = async (req, res) => {
  try {
    const response = await axios.get(`${endpointUrl}/${req.params.id}`);
    if (!response.data) return res.status(404).json({ message: 'Event Schedule not found' });
    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update Event Schedule by ID
exports.updateEventScheduleById = async (req, res) => {
  try {
    const response = await axios.put(`${endpointUrl}/${req.params.id}`, req.body);
    if (!response.data) return res.status(404).json({ message: 'Event Schedule not found' });
    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete Event Schedule by ID
exports.deleteEventScheduleById = async (req, res) => {
  try {
    const response = await axios.delete(`${endpointUrl}/${req.params.id}`);
    if (!response.data) return res.status(404).json({ message: 'Event Schedule not found' });
    res.status(200).json({ message: 'Event Schedule deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
