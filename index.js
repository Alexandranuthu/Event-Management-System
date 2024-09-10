const express = require('express');
const dotenv = require('dotenv');
const userRoutes = require('./routes/userRoutes');
const eventRoutes = require('./routes/eventRoutes');
const eventScheduleRoutes = require('./routes/eventScheduleRoutes');

dotenv.config();

const app = express();
app.use(express.json());

// Use routes
app.use('/events', eventRoutes);
app.use('/users', userRoutes);
app.use('/schedules', eventScheduleRoutes); 

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
