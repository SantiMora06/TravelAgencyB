// middleware/authorize.js
const jwt = require('jsonwebtoken');
const SECRET_KEY = 'secret'; // Should match the one used in auth.js

// Middleware to verify JWT token and check user role
const authorize = (roles = []) => {
    // roles can be a single role string (e.g., 'admin') or an array of roles
    if (typeof roles === 'string') {
        roles = [roles];
    }

    return (req, res, next) => {
        const authHeader = req.headers.authorization;

        if (!authHeader)
            return res.status(401).json({ message: 'Authorization header missing' });

        const token = authHeader.split(' ')[1];

        if (!token) return res.status(401).json({ message: 'Access Denied' });

        try {
            const decoded = jwt.verify(token, SECRET_KEY);
            req.user = decoded;

            // Check if user's role is authorized
            if (roles.length && !roles.includes(req.user.role)) {
                return res.status(403).json({ message: 'Forbidden: Access is denied' });
            }

            next();
        } catch (error) {
            console.log("Error: ", error);
            return res.status(401).json({ message: 'Invalid Token' });
        }
    };
};

module.exports = authorize;
