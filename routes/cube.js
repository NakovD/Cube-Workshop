const express = require('express');
const router = express.Router();
const Cube = require('../models/cube.js');


//createCube Logic
router.get('/create', (req, res) => {
    res.render('create');
});

router.post('/create', async (req, res) => {
    const { name,
        description,
        imageUrl,
        difficultyLevel
    } = req.body;
    const newCube = new Cube({ name, description, imageURL: imageUrl, diffLvl: difficultyLevel });
    await newCube.save(function (err) {
        if (err) {
            console.error(err);
        }
        console.log('Cube successfully added to DB!');
    });
    res.redirect('/');
});

//details Single Cube Logic
router.get('/details/:id', async (req, res) => {
    const neededCubeID = req.params.id;
    const cubeInfo = await Cube.findById(neededCubeID).lean().populate('accessories');
    res.render('details', { cube: cubeInfo });
});

module.exports = router;