const express = require('express');
const router = express.Router();
const Cube = require('../models/cube.js');
const Accessory = require('../models/accessory.js');
const { freeAccessoriesFunc } = require('../controllers/DBOperations.js');
const { updateCubeAndAccessory } = require('../controllers/DBOperations.js');


//createAccessory logic
router.get('/create/accessory', (req, res) => {
    res.render('createAccessory');
});

router.post('/create/accessory', async (req, res) => {
    const {
        name,
        imageUrl,
        description
    } = req.body;
    const newAccesory = new Accessory({ name, imageURL: imageUrl, description });
    await newAccesory.save(function (err) {
        if (err) {
            console.error(err);
        }
        console.log('Accessory successfully added to DB!');
    });
    res.redirect('/');
});

//attachAccessory Logic
router.get('/attach/accessory/:id', async (req, res) => {
    const cubeId = req.params.id;
    const cubeInfo = await Cube.findById(cubeId).lean();
    const allAccessories = await Accessory.find();
    const freeAccessories = await freeAccessoriesFunc(cubeId);
    const accessoryCheck = (allAccessories.length === freeAccessories.length) || freeAccessories.length === 0;
    res.render('attachAccessory', {
        cube: cubeInfo,
        accessories: freeAccessories,
        accessoryCheck
    });
});

router.post('/attach/accessory/:id', async (req, res) => {
    const cubeID = req.params.id;
    const accessoryID = req.body.accessory;
    const updateDB = await updateCubeAndAccessory(cubeID, accessoryID);
    res.redirect(`/details/${cubeID}`);
});

module.exports = router;

