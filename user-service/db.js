const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/userdb')
    .then(() => console.log("User Service DB Connected"))
    .catch(err => console.error("DB Error:", err));

// User Schema
const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true }, // Hash in production!
    role: { type: String, enum: ['donor', 'seeker', 'admin'], required: true },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const User = mongoose.model('User', userSchema);

module.exports = { User };