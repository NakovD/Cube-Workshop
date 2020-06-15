const express = require('express');
const router = express.Router();
const Cube = require('../models/cube.js');
const {
    authenticate,
    getCreatorId,
    userStatusCheck,
    checkAuthorFunc } = require('../controllers/auth.js');
const { cubeDiffText } = require('../controllers/DBOperations.js');


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
router.get('/details/:id', checkAuthorFunc, userStatusCheck, async (req, res) => {
    const neededCubeID = req.params.id;
    const cubeInfo = await Cube.findById(neededCubeID).lean().populate('accessories');
    res.render('details', {
        cube: cubeInfo,
        isLoggedIn: req.isLoggedIn,
        isAuthor: req.isAuthor
    });
});

//edit Cube;
router.get('/edit/:id', authenticate, checkAuthorFunc, async (req, res) => {
    const cubeId = req.params.id;
    const cubeInfo = await Cube.findById(cubeId).lean();
    res.render('editCubePage', {
        isLoggedIn: req.isLoggedIn,
        cube: cubeInfo,
    });
});

router.post('/edit/:id', authenticate, checkAuthorFunc, async (req, res) => {
    const {
        name,
        description,
        imageUrl,
        difficultyLevel,
    } = req.body;
    const cubeId = req.params.id;
    const updateCube = await Cube.findByIdAndUpdate({ _id: cubeId }, { name, description, imageURL: imageUrl, diffLvl: difficultyLevel }, (err) => {
        if (err) {
            console.log(err);
            return;
        }
        console.log('Cube edited successfully!');
    });
    res.redirect('/');
});

//delete Cube
router.get('/delete/:id', authenticate, checkAuthorFunc, async (req, res) => {
    const neededCubeID = req.params.id;
    const cubeInfo = await Cube.findById(neededCubeID).lean();
    const moddedCube = cubeDiffText(cubeInfo);
    res.render('deleteCubePage', {
        cube: moddedCube,
        isLoggedIn: req.isLoggedIn,
    });
});

router.post('/delete/:id', authenticate, checkAuthorFunc, async (req, res) => {
    const cubeId = req.params.id;
    const removeCube = await Cube.deleteOne({ _id: cubeId });
    res.redirect('/');
});

module.exports = router;