const express = require('express');

const todoController = require('../controllers/todo-controller');

let TodoRouter = express.Router();

TodoRouter.route('/todos')
    .all((req, res, next) => {
        console.log(`Always pass...`);
        next();
    })
    .post(todoController.addTodo)
    .get(todoController.getTodos);

TodoRouter.route('/todos/:id')
    .get(todoController.getTodo)
    .delete(todoController.deleteTodo)
    .patch(todoController.updateTodo);

module.exports = {
    TodoRouter
};