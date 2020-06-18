const express = require('express');
const router = express.Router();
const Cube = require('../models/cube.js');
const Accessory = require('../models/accessory.js');
const { freeAccessoriesFunc } = require('../controllers/DBOperations.js');
const { updateCubeAndAccessory } = require('../controllers/DBOperations.js');
const { authenticate } = require('../controllers/auth.js');
const failSavingInDB = require('../controllers/errorHandlers.js');


//createAccessory logic
router.get('/create/accessory', authenticate, (req, res) => {
    res.render('createAccessory', {
        isLoggedIn: req.isLoggedIn,
    });
});

router.post('/create/accessory', authenticate, async (req, res) => {
    const {
        name,
        imageUrl,
        description
    } = req.body;
    const newAccesory = new Accessory({ name, imageURL: imageUrl, description });
    try {
        const saveAccInDB = await newAccesory.save();
        res.redirect('/');
    } catch (error) {
        const errorMessage = failSavingInDB(error);
        res.render('createAccessory', {
            isLoggedIn: req.isLoggedIn,
            error: true,
            errorMessage: errorMessage
        });
    }
});

//attachAccessory Logic
router.get('/attach/accessory/:id', authenticate, async (req, res) => {
    const cubeId = req.params.id;
    try {
        const cubeInfo = await Cube.findById(cubeId).lean();
        const allAccessories = await Accessory.find();
        const freeAccessories = await freeAccessoriesFunc(cubeId);
        const accessoryCheck = (allAccessories.length === freeAccessories.length) || freeAccessories.length === 0;
        res.render('attachAccessory', {
            cube: cubeInfo,
            accessories: freeAccessories,
            accessoryCheck,
            isLoggedIn: req.isLoggedIn,
        });
    } catch (error) {
        res.render('somethWentWrongPage');
    }
});

router.post('/attach/accessory/:id', authenticate, async (req, res) => {
    const cubeID = req.params.id;
    const accessoryID = req.body.accessory;
    try {
        const updateDB = await updateCubeAndAccessory(cubeID, accessoryID);
        res.redirect(`/details/${cubeID}`);
    } catch (error) {
        res.render('somethWentWrong');
    }
});

module.exports = router;

