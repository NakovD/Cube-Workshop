const express = require('express');
const router = express.Router();
const cubeDispenser = require('../models/cube.js');

router.get('/',(req,res) => {
    res.render('create');
});

router.post('/',(req,res) => {
    const {name,
        description,
        imageUrl,
        difficultyLevel
    } = req.body;
    const newCube = new cubeDispenser(name,description,imageUrl,difficultyLevel);
    newCube.save();
    res.redirect('/');
});

module.exports = router;