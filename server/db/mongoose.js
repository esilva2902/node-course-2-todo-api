
var mongoose = require('mongoose');

mongoose.Promise = global.Promise;

// var uri = 'mongodb://esilva2902:S1lva@gettingstarted-shard-00-00-qiejp.mongodb.net:27017,gettingstarted-shard-00-01-qiejp.mongodb.net:27017,gettingstarted-shard-00-02-qiejp.mongodb.net:27017/TodoApp?ssl=true&replicaSet=GettingStarted-shard-0&authSource=admin';
// mongoose.connect(uri);

mongoose.connect(process.env.MONGODB_URI);

module.exports = { mongoose };