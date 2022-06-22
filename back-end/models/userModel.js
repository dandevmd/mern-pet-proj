const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please enter your name']
    },
    password: {
        type: String,
        required: [true, 'Please enter your password']
    },
    email: {
        type: String,
        required: [true, 'Please enter your email'],
        unique: true
    },
    isAdmin: {
        type: Boolean,
        default: false,
        required: true
    },

}, {
    timestamps: true
})

module.exports = mongoose.model('User', userSchema)