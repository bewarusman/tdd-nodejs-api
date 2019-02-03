'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const { inject } = require('./middlewares');
const routes = require('./routes');

const app = express();

app.use(morgan('tiny'));
app.use(inject); // inject models and services
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/api/v1', routes);

app.use((req, res, next) => {
    res.status(404);
    res.json({
        status: 404,
        error: 'not found'
    });
});

app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.json({
        status: err.status || 500,
        error: err.stack
    });
});

module.exports = app;