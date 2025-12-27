const express = require('express');
const router = express.Router();
const userModel = require('../Models/userModel');
const bcrypt = require('bcrypt');
const authValidator = require('../middlewares/authValidator');

// POST /api/login
router.post('/', authValidator, async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: 'Email or password is incorrect' });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Email or password is incorrect' });
        }
        res.json({ message: 'Login successful' });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
