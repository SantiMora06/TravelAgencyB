const User = require('../models/User.model')
const router = require('express').Router()


router.get('/:userId', (req, res, next) => {
    const { userId } = req.params
});

// Get all users
router.get('/', (req, res, next) => {
});

// Update a user by ID
router.put('/:userId', (req, res, next) => {
    delete req.body.passwordHash;
    const { userId } = req.params

})

// Delete a user by ID
router.delete('/:userId', (req, res, next) => {
    const { userId } = req.params
});

module.exports = router;