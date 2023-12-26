// middleware/auth.js
const jwt = require('jsonwebtoken');
require('dotenv').config();

function verifyToken(req, res, next) {
    const authorizationHeader = req.header('Authorization');
    console.log('Received authorization header:', authorizationHeader); // Log the received authorization header
    if (!authorizationHeader) return res.status(401).send('Access Denied');
    try {
        // Split the authorization header to get the token part (remove "Bearer " prefix)
        const token = authorizationHeader.split(' ')[1];
        const verified = jwt.verify(token, process.env.TOKEN_SECRET);
        
        // Save the decoded user information to req.user
        req.user = verified;
        console.log(verified)
        // Continue processing the request
        next();
    } catch (err) {
        res.status(400).send('Invalid Token');
    }
}

module.exports = verifyToken;
