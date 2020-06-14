const express = require('express');
const router = express.Router();
const { userStatusCheck } = require('../controllers/auth.js');

//about Page
router.get('/about', userStatusCheck, (req, res) => {
    res.render('about', {
        isLoggedIn: req.isLoggedIn,
    });
});
//Error Page
router.get('/', userStatusCheck, (req, res) => {
    res.render('404', {
        isLoggedIn: req.isLoggedIn,
    });
});

module.exports = router;