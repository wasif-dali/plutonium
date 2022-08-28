const mongoose = require('mongoose');

const CUSTOMER = new mongoose.Schema({
    name: String,
    balance: Number,
    address: String,
    age: Number,

    gender: {
        type: String,
        enum: ['Male', 'Female', 'Other']
    },
    isFreeAppUser:Boolean
}, { timestamps: true })

module.exports = mongoose.model('BUYER', CUSTOMER);