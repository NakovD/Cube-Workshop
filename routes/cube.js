const express = require('express');
const router = express.Router();
const Cube = require('../models/cube.js');
const {
    authenticate,
    getCreatorId,
    userStatusCheck,
    checkAuthorFunc } = require('../controllers/auth.js');
const { cubeDiffText } = require('../controllers/DBOperations.js');
const failSavingInDB = require('../controllers/errorHandlers.js');


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
    try {
        const saveCubeInDB = await newCube.save();
        res.redirect('/');
    } catch (error) {
        const errorMessage = failSavingInDB(error);
        res.render('create', {
            isLoggedIn: req.isLoggedIn,
            error: true,
            errorMessage: errorMessage
        });
    }

});

//details Single Cube Logic
router.get('/details/:id', checkAuthorFunc, userStatusCheck, async (req, res) => {
    const neededCubeID = req.params.id;
    try {
        const cubeInfo = await Cube.findById(neededCubeID).lean().populate('accessories');
        res.render('details', {
            cube: cubeInfo,
            isLoggedIn: req.isLoggedIn,
            isAuthor: req.isAuthor
        });
    } catch (error) {
        res.render('somethWentWrongPage');
    }
});

//edit Cube;
router.get('/edit/:id', authenticate, checkAuthorFunc, async (req, res) => {
    const cubeId = req.params.id;
    try {
        const cubeInfo = await Cube.findById(cubeId).lean();
        res.render('editCubePage', {
            isLoggedIn: req.isLoggedIn,
            cube: cubeInfo,
        });

    } catch (error) {
        res.render('somethWentWrongPage');
    }
});

router.post('/edit/:id', authenticate, checkAuthorFunc, async (req, res) => {
    const {
        name,
        description,
        imageUrl,
        difficultyLevel,
    } = req.body;
    const cubeId = req.params.id;
    try {
        const updateCube = await Cube.findByIdAndUpdate({ _id: cubeId }, { name, description, imageURL: imageUrl, diffLvl: difficultyLevel });
        res.redirect('/');
    } catch (error) {
        const errorMessage = failSavingInDB(error);
        res.render('editCubePage', {
            isLoggedIn: req.isLoggedIn,
            error: true,
            errorMessage: errorMessage
        });
    }
});

//delete Cube
router.get('/delete/:id', authenticate, checkAuthorFunc, async (req, res) => {
    const neededCubeID = req.params.id;
    try {
        const cubeInfo = await Cube.findById(neededCubeID).lean();
        const moddedCube = cubeDiffText(cubeInfo);
        res.render('deleteCubePage', {
            cube: moddedCube,
            isLoggedIn: req.isLoggedIn,
        });
    } catch (error) {
        res.render('somethWentWrongPage');
    }
});

router.post('/delete/:id', authenticate, checkAuthorFunc, async (req, res) => {
    const cubeId = req.params.id;
    try {
        const removeCube = await Cube.deleteOne({ _id: cubeId });
        res.redirect('/');
    } catch (error) {
        res.render('somethWentWrongPage');
    }
});

module.exports = router;