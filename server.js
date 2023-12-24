require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const connectDB = require('./src/config/db')

// Connect to Database
connectDB();

const app = express();
app.use(bodyParser.json());

// Import Routes
const authRoute = require('./src/routes/auth');
const customerServiceRoute = require('./src/routes/customerService');

// Route Middlewares
// app.use('/api/user', authRoute);
// app.use('/api/customer-service', customerServiceRoute);

// Start Server
app.listen(3000, () => console.log('Server Up and running'));
