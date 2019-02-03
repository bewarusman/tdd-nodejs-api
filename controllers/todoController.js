'use strict';

var todoController = (function() {
    var createTodo = function(req, res, next) {
        var text = req.body.text;
        if(!text) {
            next({message: 'todo should be provided'});
        }
        var todo = {text};
        var TodoModel = req.db.todoModel;
        TodoModel.create(todo, function(err){
            if(err) res.send({message: 'failed to save todo'})
            else res.send({message: 'success'})
        });
    }

    var listTodos = (req, res, next) => {
        var TodoModel = req.db.todoModel;
        TodoModel.findAll({}, function(err, todos) {
            if(err) res.send({message: 'failed to fetch list of todos'});
            else res.send({message: 'success', todos});
        })
    }

    return {
        createTodo,
        listTodos
    }
})();

module.exports = todoController;