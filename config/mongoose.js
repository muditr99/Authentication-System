const mongoose = require('mongoose');

// connect mongoose to mongodb
mongoose.connect(process.env.MONGO_URL);

// require the connection
const db = mongoose.connection;

// if error in connecting to db
db.on('error', console.error.bind(console, 'error connection to db'));

// if success in connecting to db
db.once('open', function(){
    console.log('connection to db is successful');
});

module.exports = db;