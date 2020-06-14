const User = require('../models/user.js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const privateKey = require('../config/config.js').development.privateKey;
const saltRounds = 10;

const generateToken = data => {
    const token = jwt.sign(data, privateKey);
    return token;
}

const register = async (req, res) => {
    const { username,
        password,
        repeatPassword } = req.body;
    if (username.length < 6) {
        console.log('Username should be at least 6 symbols, bruh!');
        //handle error;
        return;
    }
    if (password !== repeatPassword) {
        console.log('Passwords do not match, duh!');
        //handle error;
        return;
    }
    bcrypt.hash(password, saltRounds, async (err, encrypted) => {
        if (err) {
            console.log(err);
            throw (err);
        }
        const newUser = new User({
            username,
            password: encrypted
        });
        await newUser.save(function (err) {
            if (err) {
                console.log(err);
            }
            console.log('User is successfully registered!');
        });

        const token = generateToken({
            userId: newUser._id,
            username: newUser.username,
        });

        res.cookie('aid', token);

        res.redirect('/');
    });


}

const logIn = async (req, res) => {
    const {
        username,
        password
    } = req.body;

    const usernameCheck = await User.findOne({ username: username }).lean();
    if (!usernameCheck) {
        console.log('Invalid password or username!');
        return;
    }
    const passwordCheck = await bcrypt.compare(password, usernameCheck.password);
    if (!passwordCheck) {
        console.log('Invalid password or username!');
        return;
    }

    const token = generateToken({
        userId: usernameCheck._id,
        username: username
    });

    console.log('User successfully logged in!');

    res.cookie('aid', token);
    res.redirect('/');
}

const authenticate = (req, res, next) => {
    const token = req.cookies['aid'];
    if (!token) {
        req.isLoggedIn = false;
        res.redirect('/');
        return;
    }
    try {
        const verification = jwt.verify(token, privateKey);
        req.isLoggedIn = true;
        next();
    } catch (error) {
        console.error(error);
        res.redirect('/');
    }
}

const getCreatorId = (token) => {
    const decodedToken = jwt.verify(token, privateKey);

    return decodedToken;
}

const userStatusCheck = (req, res, next) => {
    const token = req.cookies['aid'];
    if (!token) {
        req.isLoggedIn = false;
    }
    try {
        const verification = jwt.verify(token, privateKey);
        req.isLoggedIn = true;
    } catch (error) {
        req.isLoggedIn = false;
    }
    next();
}



module.exports = {
    register,
    logIn,
    authenticate,
    userStatusCheck,
    getCreatorId
};