
//const MongoClient = require('mongodb').MongoClient;
const {MongoClient} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (error, db) => {

    if (error) {
        return console.log('Unable to connect to MongoDB...');
    }

    console.log('Connected to MongoDB server...');

    /*
    db.collection('Todos').insertOne({
        text: 'Something to do',
        completed: false

    }, (error, result) => {
        if (error)
            return console.log('Unable to insert todo', error);

        console.log(JSON.stringify(result.ops, undefined, 2));
    });
    */

    for(let i = 0; i < 2; i++) {

        db.collection('Users').insertOne({
            Name: 'Erick Silva ' + (i + 1).toString(),
            Age: 37,
            Location: 'Constancia 135 Col. Industrial'

        }, (error, result) => {

            if (error) {
                return console.log('Unable to insert todo', error);
            }

            console.log(JSON.stringify(result.ops, undefined, 2));
            console.log(result.ops[0]._id);
        });

    }

    db.close();
});