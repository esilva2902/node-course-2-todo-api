require('./config/config');

const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
var { ObjectID } = require('mongodb');

var { mongoose } = require('./db/mongoose');
var { User } = require('./models/user');
var { Todo } = require('./models/todo');

var app = express();
const port = process.env.PORT;

app.use(bodyParser.json());

app.post('/todos', (req, res) => {

    console.log(JSON.stringify(req.body.text, undefined, 2));

    var todo = new Todo({
        text: req.body.text
    });

    todo.save().then((doc) => {
        console.log('Todo saved: ', doc);
        res.send(doc);

    }).catch((error) => {
        res.status(400).send(error);
    });
});

app.get('/todos', (req, res) => {

    Todo.find().then((todos) => {
        res.send({ todos });

    }).catch((error) => {
        res.send({ todos });
    });
});

app.get('/todos/:id', (req, res) => {
    var id = req.params.id;

    if (!ObjectID.isValid(id)) {
        return res.status(404).send();
    }

    Todo.findById(id).then((todo) => {
        if (!todo) {
            return res.status(404).send();
        }

        res.send({ todo });

    }).catch((e) => {
        res.status(400).send();
    });
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
