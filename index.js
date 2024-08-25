// app.js
const express = require('express');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const schoolRoutes = require('./routes/schoolRoutes');

dotenv.config();

const app = express();

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Use the school routes
app.use('/api', schoolRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
