const crypto = require('crypto');

// Generate a unique token
const adminToken = crypto.randomBytes(32).toString('hex');
console.log(adminToken);
