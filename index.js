// index.js file
const express = require('express');
const connectDB = require('./helpers/init_mongodb');
const dotenv = require('dotenv');
const app = express();
const cors = require('cors');
// loading the environmental variables
dotenv.config();

const corsOptions = {
    origin: 'http://localhost:5000',
    methods: 'GET, POST, PUT, PATCH, DELETE',
    allowedHeaders: ['Content-Type', 'Authorization']
}


const authRoutes = require('./routes/authRoute');



// connecting to the database
connectDB();


app.use(express.json()); //middleware for parsing JSON data
app.use(cors(corsOptions)); //Use CORS middleware with specified options
app.use('/api/auth', authRoutes); //using authRoutes

// sample route to test
app.get('/', (req, res) => {
    res.send('API is running ...')
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
}) //starting server