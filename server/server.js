require('./config/config');

const express = require('express');
const bodyParser = require('body-parser');
const _ = require('lodash');

const { mongoose } = require('./db/mongoose');
const { User } = require('./models/user');

const { TodoRouter } = require('./routes/todo-routes');

const port = process.env.PORT;

const app = express();
app.use(bodyParser.json());

app.use(TodoRouter);

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

app.listen(port, () => {
    console.log(`Started on port ${port}...`);
    console.log(`Mongo connection string: ${process.env.MONGODB_URI}`)
});

module.exports = { app };
