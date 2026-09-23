const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://127.0.0.1:27017/notificationDB')
  .then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.log('❌ Mongo error:', err));

const notificationSchema = new mongoose.Schema({
  title: String,
  message: String,
  target: String,
  createdAt: { type: Date, default: Date.now }
});

const Notification = mongoose.model('Notification', notificationSchema);

app.post('/notifications', async (req, res) => {
  try {
    const notif = new Notification(req.body);
    await notif.save();
    res.json({ success: true });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false });
  }
});

app.get('/notifications', async (req, res) => {
  const { target } = req.query;
  const data = await Notification.find({
    $or: [{ target }, { target: 'all' }]
  }).sort({ createdAt: -1 });

  res.json(data);
});

app.listen(3004, () => {
  console.log('🚀 Notification Service running on port 3004');
});
