require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const connectDB = require('./src/config/db')
const verifyToken = require('./src/middleware/auth');

// Connect to Database
connectDB();

const app = express();
app.use(bodyParser.json());

// Import Routes
const authRoute = require('./src/routes/auth');
const customerServiceRoute = require('./src/routes/customerService');

//Route Middlewares
app.use('/auth', authRoute);
app.use('/customer' ,customerServiceRoute);

// Start Server
app.listen(3000, () => console.log('Server Up and running port 3000'));
