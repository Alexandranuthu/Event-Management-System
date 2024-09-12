const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();


const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            dbName: process.env.DB_NAME
        });
        console.log(`MongoDb Atlas connected ${conn.connection.host}`);
    } catch (error) {
        console.error(`MongoDB Atlas connection failed: ${error.message}`); 
        process.exit(1);
    }
};

module.exports = connectDB;





