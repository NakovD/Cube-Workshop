const User = require('../models/user.js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const privateKey = require('../config/config.js').development.privateKey;
const saltRounds = 10;
const Cube = require('../models/cube.js');

const generateToken = data => {
    const token = jwt.sign(data, privateKey);
    return token;
}

const passwordCheck = data => {
    const password = data.password;
    const repeatPassword = data.repeatPassword;
    if (password.length < 8) {
        return {
            error: true,
            message: 'Password must be at least 8 characters long!'
        }
    }

    const regex = /[A-Za-z\d]+/g;
    const passwordCheck = regex.test(password);
    if (!passwordCheck) {
        return {
            error: true,
            message: 'Password must contain only digits and/or English letters!'
        }
    }
    if (password !== repeatPassword) {
        return {
            error: true,
            message: 'Passwords do not match!'
        }
    }

    return {
        error: false
    }
}

const register = async (req, res) => {
    const { username,
        password,
        repeatPassword } = req.body;

    const passwordCheckBool = passwordCheck({
        password,
        repeatPassword
    });

    if (passwordCheckBool.error) {
        return passwordCheckBool
    }

    try {
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        const newUser = new User({
            username,
            password: hashedPassword
        });
        const saveUserInDB = await newUser.save();
        const token = generateToken({
            userId: newUser._id,
            username: newUser.username
        });
        res.cookie('aid', token);
        res.redirect('/');
        return {
            error: false
        }
    } catch (error) {
        return {
            error: true,
            message: 'Username or password are invalid!'
        }
    }
}

const logIn = async (req, res) => {
    const {
        username,
        password
    } = req.body;

    const usernameCheck = await User.findOne({ username: username }).lean();
    if (!usernameCheck) {
        return {
            error: true,
            message: 'Invalid password or username!'
        }
    }
    const passwordCheck = await bcrypt.compare(password, usernameCheck.password);
    if (!passwordCheck) {
        return {
            error: true,
            message: 'Invalid password or username!'
        }
    }
    try {
        const token = generateToken({
            userId: usernameCheck._id,
            username: username
        });
        res.cookie('aid', token);
        res.redirect('/');
        return {
            error: false
        }
    } catch (error) {
        return {
            error: true,
            message: 'Something went wrong! Please, try again later!'
        }
    }
}

const authenticate =  (req, res, next) => {
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
        if (req.url.includes('logIn') || req.url.includes('register')) {
            console.log('here');
            res.redirect('/');
            return;
        }
    } catch (error) {
        req.isLoggedIn = false;
    }
    next();
}

const checkAuthorFunc = async (req, res, next) => {
    const token = req.cookies['aid'];
    if (!token) {
        req.isAuthor = false;
        next();
        return;
    }
    const cubeId = req.params.id;
    try {
        const cube = await Cube.findById(cubeId);
        const decodedToken = jwt.verify(token, privateKey);
        if (cube.creatorId === decodedToken.userId) {
            req.isAuthor = true;
            next();
        } else {
            if (req.url.includes('edit') || req.url.includes('delete')) {
                res.redirect('/');
                return;
            }
            next();
        }
    } catch (error) {
        console.error(error);
        req.isAuthor = false;
        next();
    }
}


module.exports = {
    register,
    logIn,
    authenticate,
    userStatusCheck,
    getCreatorId,
    checkAuthorFunc
};