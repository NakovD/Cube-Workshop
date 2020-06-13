const express = require('express');
const router = express.Router();

//about Page
router.get('/about',(req,res) => {
    res.render('about');
});
//Error Page
router.get('/',(req,res) => {
    res.render('404');
});

module.exports = router;