const _ = require('lodash');
const { ObjectID } = require('mongodb');

const { Todo } = require('../models/todo');

let addTodo = (req, res) => {

    console.log(JSON.stringify(req.body, undefined, 2));

    let todo = new Todo({
        text: req.body.text
    });

    todo.save().then((doc) => {
        console.log('Todo saved: ', doc);
        res.send(doc);

    }).catch(error => {
        res.status(400).send(error);
    });
};

let getTodos = (req, res) => {

    Todo.find().then((todos) => {
        res.send(todos);

    }).catch(error => {
        res.status(400).send(error);
    });
};

let getTodo = (req, res) => {
    let id = req.params.id;

    if (!ObjectID.isValid(id)) {
        return res.status(400).send('The given Id is not valid.');
    }

    Todo.findById(id).then((todo) => {
        if (!todo) {
            return res.status(404).send();
        }

        res.send(todo);

    }).catch((e) => {
        res.status(400).send();
    });
};

let deleteTodo = (req, res) => {
    let id = req.params.id;

    if (!ObjectID.isValid(id)) {
        return res.status(404).send();
    }

    Todo.findByIdAndRemove(id).then((todo) => {
        if (!todo) {
            return res.status(404).send();
        }

        res.send(todo);
    }).catch((e) => {
        res.status(400).send();
    });
};

let updateTodo = (req, res) => {
    let id = req.params.id;
    let body = _.pick(req.body, ['text', 'completed']);

    if (!ObjectID.isValid(id)) {
        return res.status(404).send();
    }

    if (_.isBoolean(body.completed) && body.completed) {
        body.completedAt = new Date().getTime();
    } else {
        body.completed = false;
        body.completedAt = null;
    }

    Todo.findByIdAndUpdate(id, { $set: body }, { new: true }).then((todo) => {
        if (!todo) {
            return res.status(404).send();
        }

        res.send(todo);
    }).catch((e) => {
        res.status(400).send();
    })
};

module.exports = {
    addTodo,
    getTodos,
    getTodo,
    deleteTodo,
    updateTodo
};