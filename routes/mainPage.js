const express = require('express');
const router = express.Router();
const Cube = require('../models/cube.js');
const { search } = require('../controllers/DBOperations.js');
const { userStatusCheck } = require('../controllers/auth.js');

router.get('/', userStatusCheck, async (req, res) => {
    const allCubes = await Cube.find().lean();
    res.render('homePage', {
        cubes: allCubes,
        isLoggedIn: req.isLoggedIn,
    }, (err, html) => {
        if (err) {
            console.log(err);
        }
        res.send(html);
    });
});

router.post('/', userStatusCheck, async (req, res) => {
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
    res.render('homePage', {
        cubes: result,
        isLoggedIn: req.isLoggedIn
    });
});

module.exports = router;