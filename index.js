require('dotenv').config()
const env = process.env.NODE_ENV || 'development';
const mongoose = require('mongoose');

const config = require('./config/config')[env];
const express = require('express');
const app = express();

require('./config/express')(app);
require('./config/routes')(app);


mongoose.connect(config.password, {
    useNewUrlParser: true,
    useUnifiedTopology: true
},(err) => {
    if (err) {
        console.log(err.message);
        throw(err);
    }
    console.log('DB is up and running!');
});




app.listen(config.port, console.log(`Listening on port ${config.port}! Now its up to you...`));