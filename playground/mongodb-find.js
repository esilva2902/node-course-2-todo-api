
//const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (error, db) => {

    if (error) {
        return console.log('Unable to connect to MongoDB...');
    }

    console.log('Connected to MongoDB server...');

    db.collection('Todos').find({
        // _id: new ObjectID('599655f98dadae36aa4ccf2e')

    }).toArray().then((docs) => {
        console.log('Todos');

        for(let i = 0; i < docs.length; i++) {
            console.log(JSON.stringify(docs[i], undefined, 2));
        }

    }, (error) => {
        console.log(error);
    });
   
    db.collection('Todos').find({completed: false}).count().then((count) => {
        console.log(`Count Todos which were completed: ${count}`);

    }, (error) => {
        console.log(error);
    });

    db.close();
});