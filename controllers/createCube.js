const express = require('express');
const router = express.Router();
const Cube = require('../models/cube.js');

router.get('/', (req, res) => {
    res.render('create');
});

router.post('/', async (req, res) => {
    const { name,
        description,
        imageUrl,
        difficultyLevel
    } = req.body;
    const newCube = new Cube({ name, description, imageURL: imageUrl, diffLvl: difficultyLevel });
    await newCube.save(function (err) {
        if (err) {
            console.error(err);
        }
        console.log('Cube successfully added to DB!');
    });
    res.redirect('/');
});

module.exports = router;