const mongoose = require('mongoose');

const connectDB = async () => {
    try{
        const conn = await mongoose.connect(process.env.MONGO_URL)
        console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline);
    } catch (e) {
        console.log(`Error connecting to MongoDB: ${e.message}`.red.underline.bold);
        process.exit(1);
    }
}

module.exports = {connectDB}