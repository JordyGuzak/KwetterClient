const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const config = require('../config/database');



router.get('/', passport.authenticate('jwt', {session: false}) ,(req, res, next) => {
    User.getAll((error, users) => {
        if (error) {
            res.json({success: false, message: 'Database error'});
        } else {
            res.json({success: true, users: users});
        }
    });
});

router.post('/register', (req, res, next) => {
    let newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    });

    User.addUser(newUser, (error, user) => {
        if (error) {
            res.json({success: false, message: 'Failed to register user'});
        } else {
            res.json({success: true, message: 'User registered'});
        }
    });
});

router.post('/authenticate', (req, res, next) => {
    let username = req.body.username;
    let password = req.body.password;

    User.getUserByUsername(username, (error, user) => {
        if (error) throw error;
        if (!user) {
             return res.json({success: false, message: 'User not found'});
        }

        User.comparePassword(password, user.password, (error, isMatch) => {
            if (error) throw error;

            if (isMatch) {
                let token = jwt.sign(user, config.secret, {
                    expiresIn: 604800 // 1 week 
                });

                res.json({
                    success: true, 
                    token: 'JWT ' + token,
                    user: {
                        _id: user._id,
                        username: user.username,
                        email: user.email
                    }
                });
            } else {
                //No match
                return res.json({success: false, message: 'Wrong password'});
            }
        });
    });
});

router.get('/profile', passport.authenticate('jwt', {session: false}) ,(req, res, next) => {
    res.json({user: req.user});
});

  

module.exports = router;