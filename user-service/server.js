const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const mongoose = require('mongoose');

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// ===== MongoDB =====
mongoose.connect('mongodb://127.0.0.1:27017/userdb')
    .then(() => console.log("User DB Connected"))
    .catch(err => console.log(err));

// ===== User Schema =====
const userSchema = new mongoose.Schema({
    username: String,
    password: String,
    role: {
        type: String,
        enum: ['admin', 'seeker', 'donor']
    }
});

const User = mongoose.model('User', userSchema);

// ===== Register =====
app.post('/register', async (req, res) => {
    try {
        const user = new User(req.body);
        await user.save();
        res.json({ success: true });
    } catch (err) {
        res.json({ success: false, message: err.message });
    }
});

// ===== Login (FINAL FIX) =====
app.post('/login', async (req, res) => {
    const { username, password, role } = req.body;

    const user = await User.findOne({
        username,
        password,
        role
    });

    if (user) {
        res.json({ success: true, user });
    } else {
        res.json({ success: false, message: 'Invalid credentials' });
    }
});

app.listen(3001, () =>
    console.log("User Service running on port 3001")
);
