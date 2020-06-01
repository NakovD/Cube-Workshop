const express = require('express');
const router = express.Router();
const getAllCubes = require('../models/mainPage.js');
const searchFunc = require('../models/search.js');

router.get('/', async (req, res) => {
    const cubes = await getAllCubes();
    res.render('homePage', { cubes });
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