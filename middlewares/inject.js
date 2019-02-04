'use strict';

const Model = require('../models');

const inject = (req, res, next) => {
    req.db = Model;
    next();
}

module.exports = inject;