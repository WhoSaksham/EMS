const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./db');
const CODES = require('./constants/statusCodes');
const MESSAGES = require('./constants/strings');

const app = express();

const corsOptions = {
    origin: '*',
    methods: 'GET,POST,PATCH,DELETE',
    allowedHeaders: 'Content-Type,Authorization',
    credentials: true,
    optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
dotenv.config();
connectDB();

app.use(express.json());

app.get('/', (req, res) => res.send('Welcome to Employee Management System'));

app.use('/api/auth', require('./routes/auth')); // Auth Routes
app.use('/api/departments', require('./routes/departments')); // Department Routes
app.use('/api/employees', require('./routes/employees')); // Employee Routes

app.get('*', (req, res) => {
    res.status(404).json({
        code: CODES.NOT_FOUND,
        message: MESSAGES.ROUTE_NOT_FOUND,
        data: null,
        error: MESSAGES.ROUTE_NOT_FOUND
    });
});

app.listen(process.env.PORT || 8080, () => console.log(`Server has started 🚀`));
