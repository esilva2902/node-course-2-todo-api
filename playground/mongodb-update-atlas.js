
//const MongoClient = require('mongodb').MongoClient;
const { MongoClient, ObjectID } = require('mongodb');

var uri = 'mongodb://esilva2902:S1lva@gettingstarted-shard-00-00-qiejp.mongodb.net:27017,gettingstarted-shard-00-01-qiejp.mongodb.net:27017,gettingstarted-shard-00-02-qiejp.mongodb.net:27017/TodoApp?ssl=true&replicaSet=GettingStarted-shard-0&authSource=admin';

MongoClient.connect(uri, (error, db) => {

    if (error) {
        return console.log('Unable to connect to MongoDB Atlas...');
    }

    console.log('Connected to MongoDB Atlas server...');

    db.collection('Todos').findOneAndUpdate({
        _id: new ObjectID('5a4bd674b8b998f6fc85602f')

    }, {
        $set: {
            completed: true
        }
    }, {
        returnOriginal: false

    }).then((result) => {

        console.log(JSON.stringify(result, undefined, 2));

        db.close();
    });
    
});