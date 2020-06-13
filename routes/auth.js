const express = require('express');
const router = express.Router();
const User = require('../models/user.js');
const {
    register,
    logIn } = require('../controllers/auth.js');

router.get('/register', (req, res) => {
    res.render('registerPage');
});

router.post('/register', async (req, res) => {
    const registerUser = await register(req, res);
});

router.get('/logIn', (req, res) => {
    res.render('loginPage');
});

router.post('/logIn', async (req, res) => {
    const logInUser = await logIn(req, res);
});

module.exports = router;

