const User = require("../models/Users.model")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const { isAuthenticated } = require("../middleware/route-guard.middleware")
require("dotenv").config()
const router = require("express").Router()
const secret = require("../config/secretGenerator")

//All routes starts with /auth

router.get("/", (req, res) => {
    res.json("All good in auth")
})

// POST Signup
router.post("/signup", async (req, res, next) => {
    const salt = bcrypt.genSaltSync(12)
    const passwordHash = bcrypt.hashSync(req.body.password, salt)

    try {
        const newUser = await User.create({ ...req.body, passwordHash })
        const { username, email, address, phone, role, _id } = newUser;
        // Create a new object that doesn't expose the password
        const user = { username, email, address, phone, role, _id };
        res.status(201).json(user)
    } catch (error) {
        if (error.code === 11000) {
            console.log("duplicated")
        }
        next(error)
    }
})

//POST login

router.post("/login", async (req, res, next) => {
    const { username, password } = req.body;
    // try to get the user
    // Check the password

    try {
        const potentialUser = await User.findOne({ username })
        // If user exists with this username
        if (potentialUser) {
            // if user has the correct credentials
            if (bcrypt.compareSync(password, potentialUser.passwordHash)) {
                const payload = {
                    userId: potentialUser._id,
                    username: potentialUser.username,
                    role: potentialUser.role,
                };
                const authToken = jwt.sign(
                    payload,
                    secret,
                    { algorithm: "HS256", expiresIn: "6h", })
                res.json({ token: authToken })
            } else {
                res.status(403).json({ message: "Incorrect password" })
            }
        } else {
            res.status(404).json({ message: "Username or password incorrect" })
        }

    } catch (error) {
        next(error)
    }
})

// GET verified

router.get("/verify", isAuthenticated, (req, res, next) => {
    res.status(200).json({ message: 'Login verified', tokenPayload: req.tokenPayload });
})

module.exports = router