const mongoose = require('mongoose');
// mongoose.connect('mongodb://localhost:27017/lions', {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.connect('mongodb+srv://<username>:<password>@cluster0.y5hvk.mongodb.net/lions', {useNewUrlParser: true, useUnifiedTopology: true});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log("mongo connected!!");
});


module.exports = db;
