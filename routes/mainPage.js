const express = require('express');
const router = express.Router();
const Cube = require('../models/cube.js');
const { search } = require('../controllers/DBOperations.js');

router.get('/', async (req, res) => {
    const allCubes = await Cube.find().lean();
    res.render('homePage', { cubes: allCubes });
});

router.post('/', async (req, res) => {
    const {
        name,
        from,
        to
    } = req.body;
    const result = await search(name, from, to);
    if (result.length === 0) {
        res.redirect('/');
        return;
    }
    res.render('homePage', { cubes: result });
});

module.exports = router;