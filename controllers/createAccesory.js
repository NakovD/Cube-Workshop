const express = require('express');
const router = express.Router();
const Accesory = require('../models/accesory.js');

router.get('/', (req, res) => {
    res.render('createAccessory');
});

router.post('/', async (req, res) => {
    const {
        name,
        imageUrl,
        description
    } = req.body;
    const newAccesory = new Accesory({ name, imageURL: imageUrl, description });
    await newAccesory.save(function(err) {
        if (err) {
            console.error(err);
        }
        console.log('Accessory successfully added to DB!');
    });
    res.redirect('/');
});

module.exports = router;
