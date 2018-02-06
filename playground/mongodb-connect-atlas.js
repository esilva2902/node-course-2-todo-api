
//const MongoClient = require('mongodb').MongoClient;
const { MongoClient } = require('mongodb');

var uri = 'mongodb://esilva2902:S1lva@gettingstarted-shard-00-00-qiejp.mongodb.net:27017,gettingstarted-shard-00-01-qiejp.mongodb.net:27017,gettingstarted-shard-00-02-qiejp.mongodb.net:27017/TodoApp?ssl=true&replicaSet=GettingStarted-shard-0&authSource=admin';

MongoClient.connect(uri, (error, db) => {

    if (error) {
        return console.log('Unable to connect to MongoDB Atlas...');
    }

    console.log('Connected to MongoDB Atlas server...');

    db.collection('Todos').insertOne({
        text: 'Something to do',
        completed: false

    }, (error, result) => {
        if (error)
            return console.log('Unable to insert todo', error);

        console.log(JSON.stringify(result.ops, undefined, 2));
    });

    db.close();
});