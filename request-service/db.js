const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/requestDB')
    .then(() => console.log('Request DB Connected'))
    .catch(err => console.error(err));

const requestSchema = new mongoose.Schema({
    userId: String,
    title: String,
    description: String,
    category: String,
    amount: Number,
    status: {
        type: String,
        default: 'pending'
    }
});

const Request = mongoose.model('Request', requestSchema);

module.exports = { Request };
