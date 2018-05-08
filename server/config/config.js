let env = process.env.NODE_ENV || 'development';

if (env === 'test') {
    process.env.PORT = process.env.PORT || 3000;
    process.env.MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/TodoApp';

} else if (env === 'development') {
    process.env.PORT = process.env.PORT || 3000;
    process.env.MONGODB_URI = process.env.MONGODB_URI || 
        'mongodb://esilva2902:S1lva@gettingstarted-shard-00-00-qiejp.mongodb.net:27017,gettingstarted-shard-00-01-qiejp.mongodb.net:27017,gettingstarted-shard-00-02-qiejp.mongodb.net:27017/TodoApp?ssl=true&replicaSet=GettingStarted-shard-0&authSource=admin';

} else {
    process.env.PORT = process.env.PORT || 3000;
    process.env.MONGODB_URI = process.env.MONGODB_URI || 
        'mongodb://esilva2902:S1lva@gettingstarted-shard-00-00-qiejp.mongodb.net:27017,gettingstarted-shard-00-01-qiejp.mongodb.net:27017,gettingstarted-shard-00-02-qiejp.mongodb.net:27017/TodoApp?ssl=true&replicaSet=GettingStarted-shard-0&authSource=admin';
}