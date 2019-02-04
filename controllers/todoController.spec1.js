'use strict';

const chai = require('chai');
const sinon = require('sinon');
const expect = chai.expect;
const {createTodo, listTodos} = require('./todoController');

var req, res, next;

describe('todoController', () => {
    
    beforeEach(() => {
        req = {body: {text: 'Go to the meeting!'}, db: {TodoModel: {create: null, findAll: null}}};
        res = {json: sinon.fake()};
        next = sinon.fake();
    });

    afterEach(() => {
        sinon.restore();
    });
    
    describe('createTodo', async () => {
        it('text should be provided', async () => {
            req.body.text = null;
            await createTodo(req, res, next);
            expect(res.json.calledWithMatch({message: 'todo should be provided'})).to.be.true;
        });

        it.only('should send success result if todo is saved to database', async () => {
            req.db.TodoModel.create = sinon.stub().resolves({});
            await createTodo(req, res, next);
            expect(res.json.calledWithMatch({message: 'success'})).to.be.true;
        });

        it('should send fail result if todo is not saved to database', async () => {
            const err = new Error();
            req.db.TodoModel.create = sinon.stub().rejects(err);
            await createTodo(req, res, next);
            expect(next.calledWithMatch(err)).to.be.true;
        });
    });

    describe('fetchTodos', () => {
        it('should send a list of todos with success message', async () => {
            var todos = [{text: 'Go to the meeting!'}];
            req.db.TodoModel.findAll = sinon.stub().withArgs({}).resolves(todos);
            await listTodos(req, res, next);
            expect(res.json.calledWithMatch({message: 'success', todos})).to.be.true;
        });
        it('should send fail result if todo is not fetched from database', async () => {
            const err = new Error();
            req.db.TodoModel.findAll = sinon.stub().rejects(err);
            await listTodos(req, res, next);
            expect(next.calledWithMatch(err)).to.be.true;
        });
    });

});