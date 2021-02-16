const mongoose = require('mongoose');
const {isEmail} = require('validator');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 80,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
        maxlength: 20,
    },
    creationDate: {
        type: Date,
        default: Date.now
    }
});

UserSchema.index({ email: 1 }, { unique: true });

UserSchema.pre('save', function (next) {
    let user = this;
        bcrypt.hash(user.password, 12, function (e, hash) {
            if (e) return next(e);
            user.password = hash;
            next();
    });
});

UserSchema.pre('findOneAndUpdate', function (next) {
    let user = this._update;

    if (user.name && user.name === "")
        return next(new Error('The name must not be empty'));
    if (user.name && user.email === "")
        return next(new Error('The name must not be empty'));

    if (user.password) {
        if (user.password.length < 6) return next(new Error('The password must be at least 6 characters'));
        bcrypt.hash(user.password, 12, function (e, hash) {
            if (e) return next(e);
            user.password = hash;
            next();
        });
    } else {
        next(user);
    }

});

module.exports = mongoose.model('Users', UserSchema);
