const express = require('express');
const router = express.Router();
const authorize = require('../middleware/auth.middleware');

// Admin-only route
router.get('/dashboard', authorize('admin'), (req, res) => {
    res.json({ message: 'Welcome to the admin dashboard' });
});

// Route accessible by both admin and user
router.get('/profile', authorize(['admin', 'user']), (req, res) => {
    res.json({ message: `Welcome, user ${req.user.userId}` });
});

module.exports = router;
