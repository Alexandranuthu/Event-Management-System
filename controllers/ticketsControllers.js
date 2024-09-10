const axios = require('axios');
const endpointUrl = "https://ap-south-1.aws.data.mongodb-api.com/app/application-0-kucgxyr/endpoint/TicketsData";

// Create a new ticket
exports.createTicket = async (req, res) => {
  try {
    const response = await axios.post(endpointUrl, req.body);
    res.status(201).json(response.data);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all tickets for an event
exports.getTicketsByEvent = async (req, res) => {
  try {
    const response = await axios.get(`${endpointUrl}/event/${req.params.event_id}`);
    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get ticket by ID
exports.getTicketById = async (req, res) => {
  try {
    const response = await axios.get(`${endpointUrl}/${req.params.id}`);
    if (!response.data) return res.status(404).json({ message: 'Ticket not found' });
    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a ticket by ID
exports.updateTicket = async (req, res) => {
  try {
    const response = await axios.put(`${endpointUrl}/${req.params.id}`, req.body);
    if (!response.data) return res.status(404).json({ message: 'Ticket not found' });
    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a ticket by ID
exports.deleteTicket = async (req, res) => {
  try {
    const response = await axios.delete(`${endpointUrl}/${req.params.id}`);
    if (!response.data) return res.status(404).json({ message: 'Ticket not found' });
    res.status(200).json({ message: 'Ticket deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
