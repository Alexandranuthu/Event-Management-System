// index.js file
const express = require('express');
const connectDB = require('./helpers/init_mongodb');
const dotenv = require('dotenv');
const app = express();

// loading the environmental variables
dotenv.config();


const authRoutes = require('./routes/authRoute');



// connecting to the database
connectDB();


app.use(express.json()); //middleware for parsing JSON data
app.use('/api/auth', authRoutes); //using authRoutes

// sample route to test
app.get('/', (req, res) => {
    res.send('API is running ...')
});



const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
}) //starting server