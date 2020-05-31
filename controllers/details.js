const express = require('express');
const router = express.Router();
const getCubeInfo = require('../models/detailsCube.js');

router.get('/:id',async (req,res) => {
    const neededCube = req.params.id;
    const cubeInfo = await getCubeInfo(neededCube);
    // debugger;
    res.render('details',{cube:cubeInfo});
});

module.exports = router;