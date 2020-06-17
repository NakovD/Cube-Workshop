const mongoose = require('mongoose');

const Accessory = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: [5, 'Cube name must be at least 5 characters long!'],
        match: /[A-Za-z\d ]+/g
    },
    imageURL: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true,
        minlength: [20, 'Description should be at least 20 characters!'],
        maxlength: [250, 'Description cannot be more that 250 characters!'],
        match: /[A-Za-z\d ]+/g
    },
    cubes: [{
        type: 'ObjectId',
        ref: 'Cube'
    }]
});

Accessory.path('imageURL').validate(function (value) {
    return value.startsWith('http://') || value.startsWith('https://');
}, 'Image url is invalid!');

module.exports = mongoose.model('Accessory', Accessory);