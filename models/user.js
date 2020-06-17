const mongoose = require('mongoose');

const User = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        minlength: [5, 'Username must be at least 5 characters long!'],
        match: /[A-Za-z\d]+/g
    },
    password: {
        type: String,
        required: true,
        minlength: [8, 'Password must be at least 8 characters long!'],
        match: /[A-Za-z\d]+/g
    }
});

module.exports = mongoose.model('User', User);