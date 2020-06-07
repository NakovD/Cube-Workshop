const express = require('express');
const router = express.Router();
const Cube = require('../models/cube.js');
const Accessory = require('../models/accesory.js');

router.get('/:id', async (req, res) => {
    const neededCubeID = req.params.id;
    const cubeInfo = await Cube.findById(neededCubeID).lean().populate('accessories');
    res.render('details', { cube: cubeInfo });
});

module.exports = router;