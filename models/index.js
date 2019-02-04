'use strict';

const Sequelize = require('sequelize');
const TodoModel = require('./TodoModel');

const Op = Sequelize.Op;

// --- connect ---
const sequelize = new Sequelize('epos', 'root', 'D!ve31min', {
    host: 'localhost',
    dialect: 'mysql',
    pool: {
      max: 10,
      min: 0,
      acquire: 30000,
      idle: 10000
    },
    operatorsAliases: {
        $and: Op.and,
        $or: Op.or,
        $eq: Op.eq,
        $gt: Op.gt,
        $lt: Op.lt,
        $lte: Op.lte,
        $like: Op.like
    }
});

// --- models ---
const todo = TodoModel(sequelize, Sequelize);

// sync models with database
sequelize.sync({ force: false })
    .then(() => {
        console.log(`Database & Tables created!`);
    })
    .catch(err => {
        console.log(err.stack);
    });

module.exports = {
    TodoModel: todo
}