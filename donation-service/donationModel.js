const mongoose = require('mongoose');

const donationSchema = new mongoose.Schema({
    donorId: String,
    donorName: String,
    phoneNumber: String,
    amount: Number,
    paymentMethod: String
}, { timestamps: true });

module.exports = mongoose.model('Donation', donationSchema);
