// controllers/bookingController.js
const axios = require('axios');
const endpointUrl = "https://ap-south-1.aws.data.mongodb-api.com/app/application-0-kucgxyr/endpoint/BookingsData";

// Create a Booking
exports.createBooking = async (req, res) => {
  try {
    const response = await axios.post(endpointUrl, req.body);
    res.status(201).json(response.data);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all Bookings
exports.getAllBookings = async (req, res) => {
  try {
    const response = await axios.get(endpointUrl);
    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get Booking by ID
exports.getBookingById = async (req, res) => {
  try {
    const response = await axios.get(`${endpointUrl}/${req.params.id}`);
    if (!response.data) return res.status(404).json({ message: 'Booking not found' });
    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update Booking by ID
exports.updateBookingById = async (req, res) => {
  try {
    const response = await axios.put(`${endpointUrl}/${req.params.id}`, req.body);
    if (!response.data) return res.status(404).json({ message: 'Booking not found' });
    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete Booking by ID
exports.deleteBookingById = async (req, res) => {
  try {
    const response = await axios.delete(`${endpointUrl}/${req.params.id}`);
    if (!response.data) return res.status(404).json({ message: 'Booking not found' });
    res.status(200).json({ message: 'Booking deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
