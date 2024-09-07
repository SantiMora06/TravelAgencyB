const User = require("../models/User.model")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
require("dotenv").config()
const router = require("express").Router()
const secret = process.env.JWT_SECRET

//All routes starts with /auth

router.get("/", (req, res) => {
    res.json("All good in auth")
})

// POST Signup
router.post("/register", async (req, res, next) => {
    try {
        const { username, password, role } = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({ username });
        if (existingUser)
            return res.status(400).json({ message: 'User already exists' });

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user
        const user = new User({
            username,
            password: hashedPassword,
            role, // Should validate or default to 'user'
        });

        await user.save();

        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.log("Error:", error);
        res.status(500).json({ message: 'Server error' });
    }
})

//POST login

router.post("/login", async (req, res, next) => {
    try {
        const { username, password } = req.body;

        // Find user
        const user = await User.findOne({ username });
        if (!user)
            return res.status(400).json({ message: 'Invalid username or password' });

        // Check password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch)
            return res.status(400).json({ message: 'Invalid username or password' });

        // Create JWT payload
        const payload = {
            userId: user._id,
            role: user.role,
        };

        // Sign token
        const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '1h' });

        res.json({ token });
    } catch (error) {
        console.log("Error:", error);
        res.status(500).json({ message: 'Server error' });
    }
})

// GET verified

router.get("/verify", (req, res, next) => {
    res.status(200).json({ message: 'Login verified', tokenPayload: req.tokenPayload });
})

module.exports = router