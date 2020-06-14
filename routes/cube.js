const express = require('express');
const router = express.Router();
const Cube = require('../models/cube.js');
const {
    authenticate,
    getCreatorId,
    userStatusCheck } = require('../controllers/auth.js');


//createCube Logic
router.get('/create', authenticate, (req, res) => {
    res.render('create', {
        isLoggedIn: req.isLoggedIn,
    });
});

router.post('/create', authenticate, async (req, res) => {
    const { name,
        description,
        imageUrl,
        difficultyLevel
    } = req.body;
    const token = req.cookies['aid'];
    const creatorId = getCreatorId(token).userId;
    const newCube = new Cube({ name, description, imageURL: imageUrl, diffLvl: difficultyLevel, creatorId });
    await newCube.save(function (err) {
        if (err) {
            console.error(err);
            return;
        }
        console.log('Cube successfully added to DB!');
    });
    res.redirect('/');
});

//details Single Cube Logic
router.get('/details/:id', userStatusCheck, async (req, res) => {
    const neededCubeID = req.params.id;
    const cubeInfo = await Cube.findById(neededCubeID).lean().populate('accessories');
    res.render('details', {
        cube: cubeInfo,
        isLoggedIn: req.isLoggedIn,
    });
});

module.exports = router;