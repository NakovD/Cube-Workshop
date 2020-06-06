const express = require('express');
const router = express.Router();
const Cube = require('../models/cube.js');

router.get('/:id', async (req, res) => {
    const neededCubeID = req.params.id;
    const cubeInfo = await Cube.findById(neededCubeID).lean();
    res.render('details', { cube: cubeInfo });
});

module.exports = router;