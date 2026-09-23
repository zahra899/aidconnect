const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const { Request } = require('./db');

const app = express();

app.use(cors());
app.use(bodyParser.json());

// ✅ CREATE REQUEST
app.post('/requests', async (req, res) => {
    try {
        const newRequest = new Request(req.body);
        await newRequest.save();
        res.status(201).json({ success: true, request: newRequest });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

// ✅ GET ALL REQUESTS (ADMIN)
app.get('/requests', async (req, res) => {
    const requests = await Request.find();
    res.json(requests);
});

// ✅ GET REQUESTS BY USER (SEEKER)
app.get('/requests/user/:id', async (req, res) => {
    const requests = await Request.find({ userId: req.params.id });
    res.json(requests);
});

// ✅ UPDATE STATUS (ADMIN)
app.put('/requests/:id', async (req, res) => {
    await Request.findByIdAndUpdate(req.params.id, {
        status: req.body.status
    });
    res.json({ success: true });
});

app.listen(3002, () => {
    console.log('Request Service running on port 3002');
});
// request-service/server.js

const axios = require('axios');

app.put('/requests/:id/approve', async (req, res) => {
    try {
        const request = await Request.findByIdAndUpdate(
            req.params.id,
            { status: 'approved' },
            { new: true }
        );

        // 🔔 SEND NOTIFICATION
        await axios.post('http://localhost:3004/notifications', {
            title: 'New Request Approved',
            message: `A new request "${request.title}" is available for donation.`,
            target: 'donor'
        });

        res.json({ success: true, request });

    } catch (err) {
        res.json({ success: false, error: err.message });
    }
});

