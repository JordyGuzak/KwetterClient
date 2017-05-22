const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');


//User Schema
const UserSchema = mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

const User = module.exports = mongoose.model('User', UserSchema);

module.exports.getAll = function(callback) {
    User.find(callback);
}

//Get by ID
module.exports.getUserById = function(id, callback) {
    User.findById(id, callback);
}

//Get by username
module.exports.getUserByUsername = function(username, callback) {
    let query = {username: username};
    User.findOne(query, callback);
}

//Add user
module.exports.addUser = function(newUser, callback) {
    bcrypt.genSalt(10, (error, salt) => {
        if (error) throw error;
        bcrypt.hash(newUser.password, salt, (error, hash) => {
            newUser.password = hash;
            newUser.save(callback);
        });
    });
}

module.exports.comparePassword = function(password, hash, callback) {
    bcrypt.compare(password, hash, (error, isMatch) => {
        if (error) throw error;
        callback(null, isMatch);
    });
}


