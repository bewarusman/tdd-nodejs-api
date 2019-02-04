'use strict';

var todoController = (() => {

    var createTodo = async (req, res, next) => {
        try {
            var text = req.body.text;
            if(!text) {
                var err = new Error('todo should be provided');
                err.msg = 'todo should be provided';
                err.status = 406;
                next(err);
                return;
            }
            var todo = {text};
            var TodoModel = req.db.TodoModel;
            await TodoModel.create(todo);
            res.json({message: 'success'});
        } catch(err) {
            err.msg = 'failed to save todo';
            err.status = 400;
            next(err);
        }
    }

    var listTodos = async (req, res, next) => {
        try {
            var TodoModel = req.db.TodoModel;
            var todos = await TodoModel.findAll({});
            res.json({message: 'success', todos});
        } catch(err) {
            err.msg = 'failed to fetch todos';
            err.status = 400;
            next(err);
        }
    }

    return {
        createTodo,
        listTodos
    }
})();

module.exports = todoController;