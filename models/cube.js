const mongoose = require('mongoose');

const Cube = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true, maxlength: 250 },
    imageURL: { type: String, required: true },
    diffLvl: { type: Number, required: true, min: 1, max: 6 },
    creatorId: { type: String, required: true },
    accessories: [{ type: 'ObjectId', ref: 'Accessory' }]
});

Cube.path('imageURL').validate(function (value) {
    return value.startsWith('http://') || value.startsWith('https://');
}, 'Image url is invalid!');

module.exports = mongoose.model('Cube', Cube);