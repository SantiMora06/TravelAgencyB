const jwt = require("jsonwebtoken")
const secret = require("../config/secretGenerator")
const User = require("../models/Users.model")

const isAuthenticated = async (req, res, next) => {

    const token = req.headers.authorization?.split(" ")[1]// Get the token from headers (Bearer 12121CDJDS)    

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized: No token provided' });
    }
    const payload = jwt.verify(token, secret) // Decode the token and get payload

    try {

        const user = await User.findById(payload.userId)
        if (!user) {
            return res.status(401).json({ message: 'Unauthorized: User not found' });
        }
        req.user = user; // this might not be necesarry, because tokenPayload already has userId
        req.tokenPayload = payload // pass the decoded payload to the next route
        next()
    } catch (error) {
        res.status(401).json("Token not provided or expired")
    }
}

module.exports = { isAuthenticated }