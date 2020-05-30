const express = require('express');
const router = express.Router();
const getAllCubes = require('../models/mainPage.js');

router.get('/',(req,res) => {
    const cubes = getAllCubes();
    res.render('homePage',{cubes});
});

module.exports = router;