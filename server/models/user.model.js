const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

var userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: 'Full name cannot be empty '
    },
    email: {
        type: String,
        required: 'Email cannott be empty',
        unique: true
    },
    password: {
        type: String,
        required: 'Password cannot be empty',
        minlength: [6, 'Password must be atleast 6 character long']
    },
    dob: {
        type: Date,
        required: 'DOB cannot be empty',
    },
    gender: {
        type: String,
        required: 'Gender cannot be empty',
    },
    saltSecret: String
}, { timestamps: true });

// Custom validation for email
userSchema.path('email').validate((val) => {
    emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailRegex.test(val);
}, 'Invalid e-mail.');

// Events
userSchema.pre('save', function(next) {
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(this.password, salt, (err, hash) => {
            this.password = hash;
            this.saltSecret = salt;
            next();
        });
    });
});

mongoose.model('User', userSchema);