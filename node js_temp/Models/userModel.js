// Models/userModel.js

// نموذج مستخدم باستخدام Mongoose مع التحقق من صحة البريد الإلكتروني
const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: function (v) {
                return validator.isEmail(v);
            },
            message: props => `${props.value} ليس بريدًا إلكترونيًا صالحًا!`
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    isAdmin: {
        type: Boolean,
        default: false
    }
});


// إضافة دالة توليد JWT إلى النموذج
const jwt = require('jsonwebtoken');
const config = require('config');

userSchema.methods.generateJWT = function () {
    const jwtSecret = config.get('jwtSecret');
    if (!jwtSecret) {
        throw new Error('JWT secret is not configured');
    }
    return jwt.sign(
        { userID: this._id, isAdmin: this.isAdmin },
        jwtSecret,
        { expiresIn: '1h' }
    );
};

const User = mongoose.model('User', userSchema);

module.exports = User;
