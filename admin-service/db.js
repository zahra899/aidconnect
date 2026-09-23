const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect("mongodb://127.0.0.1:27017/adminDB");
        console.log("Admin Service: MongoDB Connected ");
    } catch (err) {
        console.error("MongoDB Error ", err);
        process.exit(1);
    }
};

module.exports = connectDB;
