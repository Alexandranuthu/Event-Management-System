const axios = require('axios');

// Replace with your MongoDB Data API endpoint
const endpointUrl = 'https://ap-south-1.aws.data.mongodb-api.com/app/application-0-kucgxyr/endpoint/eventsdata';

// Ensure you have the correct API key in your environment variables
const apiKey = process.env.MONGO_API_KEY;

// Create a new event
exports.createEvent = async (req, res) => {
  try {
    const event = req.body;
    const response = await axios.post(endpointUrl, event, {
      headers: {
        'Content-Type': 'application/json',
        'api-key': apiKey
      }
    });
    res.status(201).json(response.data);
  } catch (err) {
    console.error('Error in createEvent:', err.message);
    res.status(400).json({ error: err.message });
  }
};

// Get all events
exports.getAllEvents = async (req, res) => {
  try {
    const response = await axios.get(endpointUrl, {
      headers: {
        'api-key': apiKey
      }
    });
    res.status(200).json(response.data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get a single event by ID
exports.getEventById = async (req, res) => {
  try {
    const eventId = req.params.id;
    const response = await axios.get(`${endpointUrl}/${eventId}`, {
      headers: {
        'api-key': apiKey
      }
    });
    if (!response.data) {
      return res.status(404).json({ error: 'Event not found' });
    }
    res.status(200).json(response.data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update an event by ID
exports.updateEventById = async (req, res) => {
  try {
    const eventId = req.params.id;
    const updatedData = req.body;
    const response = await axios.patch(`${endpointUrl}/${eventId}`, updatedData, {
      headers: {
        'Content-Type': 'application/json',
        'api-key': apiKey
      }
    });
    if (!response.data) {
      return res.status(404).json({ error: 'Event not found' });
    }
    res.status(200).json(response.data);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete an event by ID
exports.deleteEventById = async (req, res) => {
  try {
    const eventId = req.params.id;
    const response = await axios.delete(`${endpointUrl}/${eventId}`, {
      headers: {
        'api-key': apiKey
      }
    });
    if (!response.data) {
      return res.status(404).json({ error: 'Event not found' });
    }
    res.status(200).json({ message: 'Event deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
