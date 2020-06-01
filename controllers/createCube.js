const express = require('express');
const router = express.Router();
const { Cube, pathDB } = require('../models/cube.js');

router.get('/', (req, res) => {
    res.render('create');
});

router.post('/', (req, res) => {
    const { name,
        description,
        imageUrl,
        difficultyLevel
    } = req.body;
    const newCube = new Cube(name, description, imageUrl, difficultyLevel);
    newCube.save();
    res.redirect('/');
});

module.exports = router;