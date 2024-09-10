// controllers/eventController.js
const axios = require('axios');
const endpointUrl = 'https://ap-south-1.aws.data.mongodb-api.com/app/application-0-kucgxyr/endpoint/eventsdata';

// Create an Event
exports.createEvent = async (req, res) => {
  try {
    const response = await axios.post(endpointUrl, req.body);
    res.status(201).json(response.data);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all Events
exports.getAllEvents = async (req, res) => {
  try {
    const response = await axios.get(endpointUrl);
    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get Event by ID
exports.getEventById = async (req, res) => {
  try {
    const response = await axios.get(`${endpointUrl}/${req.params.id}`);
    if (!response.data) return res.status(404).json({ message: 'Event not found' });
    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update Event by ID
exports.updateEventById = async (req, res) => {
  try {
    const response = await axios.put(`${endpointUrl}/${req.params.id}`, req.body);
    if (!response.data) return res.status(404).json({ message: 'Event not found' });
    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete Event by ID
exports.deleteEventById = async (req, res) => {
  try {
    const response = await axios.delete(`${endpointUrl}/${req.params.id}`);
    if (!response.data) return res.status(404).json({ message: 'Event not found' });
    res.status(200).json({ message: 'Event deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
