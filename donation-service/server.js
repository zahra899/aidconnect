const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const connectDB = require('./db');
const Donation = require('./donationModel');

const app = express();
connectDB();

app.use(cors());
app.use(bodyParser.json());

// ✅ CREATE DONATION (NO requestId REQUIRED)
app.post('/donations', async (req, res) => {
    try {
        const { donorId, donorName, phoneNumber, amount } = req.body;

        if (!donorId || !donorName || !phoneNumber || !amount) {
            return res.status(400).json({
                success: false,
                error: "All fields are required"
            });
        }

        const donation = new Donation({
            donorId,
            donorName,
            phoneNumber,
            amount,
            paymentMethod: "EasyPaisa"
        });

        await donation.save();

        res.json({
            success: true,
            message: "Donation successful"
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

// ✅ GET ALL DONATIONS
app.get('/donations', async (req, res) => {
    const donations = await Donation.find().sort({ createdAt: -1 });
    res.json({ success: true, donations });
});

app.listen(3003, () => {
    console.log(" Donation Service running on port 3003");
});
