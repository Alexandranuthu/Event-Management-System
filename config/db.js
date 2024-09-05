const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDb connected ${conn.connection.host}`);
    } catch (error) {
        console.error(`MongoDB connection failed', ${error.message}`);
        process.exit(1);
    }
};

module.exports = connectDB;
