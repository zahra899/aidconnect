const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const jwt = require('jsonwebtoken'); // add karo npm install jsonwebtoken

const app = express();

app.use(cors());
app.use(bodyParser.json());

const { Admin, User, Request } = require('./db'); // assume karo yeh models hain

// Admin login
app.post('/admin/login', async (req, res) => {
    const { email, password } = req.body;
    const admin = await Admin.findOne({ email });
    if (admin && admin.password === password) { // real ma bcrypt use karo
        const token = jwt.sign({ role: 'admin', id: admin._id }, 'secretkey');
        res.json({ success: true, token, role: 'admin' });
    } else {
        res.json({ success: false, error: 'Invalid credentials' });
    }
});

// Get all users (admin only)
app.get('/admin/users', async (req, res) => {
    const users = await User.find();
    res.json(users);
});

// Approve request (admin only)
app.put('/admin/requests/:id', async (req, res) => {
    try {
        const { status } = req.body;
        await Request.findByIdAndUpdate(req.params.id, { status });
        res.json({ success: true });
    } catch (err) {
        res.json({ success: false, error: err.message });
    }
});

app.listen(3001, () => console.log("Admin Service running on port 3001"));