'use strict';

const express = require('express');
const todoController = require('../controllers/todoController');

const router = express.Router();

const TodoRoutes = (() => {
    router.route('/todos')
        .get(todoController.listTodos)
        .post(todoController.createTodo)
    
    return router;
})();

module.exports = TodoRoutes;