const express = require('express');
const cors = require('cors');
const app = express();
const contactsRouter = require('./app/routes/contact.route.js');
const ApiError = require('./app/api-error.js');

app.use(cors());
app.use(express.json());
app.use('/api/contacts', contactsRouter);

app.use((req, res, next) => {
    return next(new ApiError(404, 'Not Found'));
});

app.use((err, req, res, next) => {
    res.status(err.statusCode || 500).json({
        message: err.message || 'Internal Server Error',
    });
});

app.get('/', (req, res) => {
    res.json({ message: 'Welcome to contact book application.' });
});

module.exports = app;
