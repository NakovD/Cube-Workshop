const express = require('express');
const router = express.Router();
const Cube = require('../models/cube.js');
const searchFunc = require('../models/search.js');

router.get('/', async (req, res) => {
    const allCubes = await Cube.find().lean();
    res.render('homePage', { cubes:allCubes });
});

router.post('/', async (req, res) => {
    const {
        search,
        from,
        to
    } = req.body;
    const result = await searchFunc(search, from, to);
    if (result.length === 0) {
        res.redirect('/');
        return;
    }
    res.render('homePage', { cubes: result });
});

module.exports = router;