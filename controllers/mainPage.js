const express = require('express');
const router = express.Router();
const getAllCubes = require('../models/mainPage.js');

router.get('/',async (req,res) => {
    const cubes = await getAllCubes();
    
    res.render('homePage');
});

module.exports = router;