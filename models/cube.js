const mongoose = require('mongoose');

const Cube = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: [5, 'Cube name must be at least 5 characters long!'],
        match: /[A-Za-z\d ]+/g
    },
    description: {
        type: String,
        required: true,
        minlength: [20, 'Description should be at least 20 characters!'],
        maxlength: [250, 'Description cannot be more that 250 characters!'],
        match: /[A-Za-z\d ]+/g
    },
    imageURL: {
        type: String,
        required: true
    },
    diffLvl: {
        type: Number,
        required: true,
        min: 1,
        max: 6
    },
    creatorId: {
        type: String,
        required: true
    },
    accessories: [{
        type: 'ObjectId',
        ref: 'Accessory'
    }]
});

Cube.path('imageURL').validate(function (value) {
    return value.startsWith('http://') || value.startsWith('https://');
}, 'Image url is invalid!');

module.exports = mongoose.model('Cube', Cube);