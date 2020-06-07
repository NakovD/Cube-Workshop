const mongoose = require('mongoose');

const Accessory = new mongoose.Schema({
    name: { type: String, required: true },
    imageURL: { type: String, required: true },
    description: { type: String, required: true, maxlength: 250 },
    cubes: [{ type: 'ObjectId', ref: 'Cube' }]
});

Accessory.path('imageURL').validate(function (value) {
    return value.startsWith('http://') || value.startsWith('https://');
}, 'Image url is invalid!');

module.exports = mongoose.model('Accessory', Accessory);