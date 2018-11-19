require('./config/config');

const express = require('express');
const bodyParser = require('body-parser');
const { ObjectID } = require('mongodb');
const _ = require('lodash');

const { mongoose } = require('./db/mongoose');
const { User } = require('./models/user');
const { Todo } = require('./models/todo');

const port = process.env.PORT;

const app = express();
app.use(bodyParser.json());

// POST /todos:
app.post('/todos', (req, res) => {

    console.log(JSON.stringify(req.body, undefined, 2));

    let todo = new Todo({
        text: req.body.text
    });

    todo.save().then((doc) => {
        console.log('Todo saved: ', doc);
        res.send(doc);

    }).catch((error) => {
        res.status(400).send(error);
    });
});

// GET /todos:
app.get('/todos', (req, res) => {

    Todo.find().then((todos) => {
        res.send(todos);

    }).catch((error) => {
        res.send({ todos });
    });
});

// GET /todos/:id:
app.get('/todos/:id', (req, res) => {
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
});

// DELETE /todos/:id:
app.delete('/todos/:id', (req, res) => {
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
});

// PATCH /todos/:id:
app.patch('/todos/:id', (req, res) => {
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

        res.send({ todo });
    }).catch((e) => {
        res.status(400).send();
    })
});

// POST /users
app.post('/users', (req, res) => {

    var body = _.pick(req.body, ['email', 'password']);
    var user = new User(body);

    user.save().then((user) => {
        res.send(user);
    }).catch((e) => {
        res.status(400).send(e);
    })
});

app.post('/getEcho', (req, res) => {

    var echoString = req.body.echoString;

    console.log(`Entering /getEcho method: echoString is ${echoString}`);

    if (echoString) {
        res.json({
            "echoString": echoString,
            "date": new Date()
        });
    }
    else {
        res.status(400).send('echoString variable must be supplied.');
    }
});

app.listen(port, () => {
    console.log(`Started on port ${port}...`);
    console.log(`Mongo connection string: ${process.env.MONGODB_URI}`)
});

module.exports = { app };
