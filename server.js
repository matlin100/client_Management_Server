require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const connectDB = require('./src/config/db')
const cors = require('cors');
const verifyToken = require('./src/middleware/auth');


// Connect to Database
connectDB();

const app = express();
app.use(bodyParser.json());
app.use(cors());
// Import Routes
const authRoute = require('./src/routes/user');
const customerRoute = require('./src/routes/customerRoutes');

//Route Middlewares
app.use('/auth', authRoute);
app.use('/customer' ,customerRoute);

// Start Server
app.listen(process.env.PORT || 3000, () => console.log('Server Up and running port 3000'));
