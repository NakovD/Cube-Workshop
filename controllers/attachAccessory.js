const express = require('express');
const router = express.Router();
const Cube = require('../models/cube.js');
const Accessory = require('../models/accesory.js');

router.get('/:id', async (req, res) => {
    const cubeId = req.params.id;
    const cubeInfo = await Cube.findById(cubeId).lean();
    const allAccessories = await Accessory.find().lean();
    const arrayWithIDStrings = cubeInfo.accessories.map(el => el.toHexString());
    const filtered = allAccessories.filter(el => !arrayWithIDStrings.includes(el._id.toHexString()));
    const accessoryCheck = (allAccessories.length === filtered.length) || filtered.length === 0;
    res.render('attachAccessory', {
        cube: cubeInfo,
        accessories: filtered,
        accessoryCheck
    });
});
router.post('/:id', async (req, res) => {
    const cubeID = req.params.id;
    const accessoryID = req.body.accessory;
    await Cube.findByIdAndUpdate(cubeID, {
        $addToSet: { accessories: [accessoryID] }
    });
    await Accessory.findByIdAndUpdate(accessoryID, {
        $addToSet: { cubes: [cubeID] }
    });
    res.redirect(`/details/${cubeID}`);
});
module.exports = router;