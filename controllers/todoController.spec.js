const chai = require('chai');
const sinon = require('sinon');
const expect = chai.expect;
const {createTodo, listTodos} = require('./todoController');

var req, res, next;

describe('todoController', function() {
    
    beforeEach(function() {
        req = {body: {text: 'Go to the meeting!'}, db: {todoModel: {create: sinon.stub(), findAll: sinon.stub()}}};
        res = {send: sinon.fake()};
        next = sinon.fake();
        createTodo(req, res, next);
        listTodos(req, res, next);
    });

    afterEach(function() {
        sinon.restore();
    });
    
    describe('createTodo', function() {
        it('text should be provided', function() {
            expect(next.called).to.be.false;
        });

        it('should send success result if todo is saved to database', function() {
            req.db.todoModel.create.callsFake(({}, cb) => {
                cb(null);
            });
            createTodo(req, res, next);
            expect(res.send.calledWithMatch({message: 'success'})).to.be.true;
        });

        it('should send fail result if todo is not saved to database', function() {
            req.db.todoModel.create.callsFake(({}, cb) => {
                cb(new Error());
            });
            createTodo(req, res, next);
            expect(res.send.calledWithMatch({message: 'failed to save todo'})).to.be.true;
        });
    });

    describe('fetchTodos', function() {
        it('should send a list of todos with success message', function() {
            var todos = [{text: 'Go to the meeting!'}];
            req.db.todoModel.findAll.callsFake(({}, cb) => {
                cb(null, todos);
            });
            listTodos(req, res, next);
            expect(res.send.calledWithMatch({message: 'success', todos})).to.be.true;
        });
        it('should send fail result if todo is not fetched from database', function() {
            req.db.todoModel.findAll.callsFake(({}, cb) => {
                cb(new Error());
            });
            listTodos(req, res, next);
            expect(res.send.calledWithMatch({message: 'failed to fetch list of todos'})).to.be.true;
        });
    });

});