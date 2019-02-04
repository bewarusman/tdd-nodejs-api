const chai = require('chai');
const sinon = require('sinon');
const expect = chai.expect;
const {createTodo, listTodos} = require('./todoController');

var req, res, next;

describe('todoController', function() {
    
    beforeEach(function() {
        req = {body: {text: 'Go to the meeting!'}, db: {TodoModel: {create: null, findAll: null}}};
        res = {json: sinon.fake()};
        next = sinon.fake();
    });

    afterEach(function() {
        sinon.restore();
    });
    
    describe('createTodo', function() {

        it('text should be provided', async function() {
            req.body.text = null;
            await createTodo(req, res, next);
            expect(next.args[0][0]).to.have.property('msg', 'todo should be provided');
        });

        it('should send success result if todo is saved to database', async function() {
            req.db.TodoModel.create = sinon.stub().resolves();
            await createTodo(req, res, next);
            expect(res.json.args[0][0]).to.have.property('message', 'success');
        });

        it('should send fail result if todo is not saved to database', async function() {
            req.db.TodoModel.create = sinon.stub().rejects(new Error());
            await createTodo(req, res, next);
            expect(next.args[0][0]).to.have.property('msg', 'failed to save todo');
        });

    });

    describe('fetchTodos', function() {
        
        it('should send a list of todos with success message', async function() {
            var todos = [{text: 'Go to the meeting!'}];
            req.db.TodoModel.findAll = sinon.stub().resolves(todos);
            await listTodos(req, res, next);
            expect(res.json.args[0][0]).to.have.property('message', 'success');
            expect(res.json.args[0][0].todos).to.be.an('array').to.have.lengthOf(1);
        });

        it('should send fail result if todo is not fetched from database', async function() {
            req.db.TodoModel.findAll = sinon.stub().rejects();
            await listTodos(req, res, next);
            expect(next.args[0][0]).to.have.property('msg', 'failed to fetch todos');
        });

    });

});