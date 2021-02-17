const mongoose = require('mongoose');
const {isEmail} = require('validator');
const Financial = require('../model/financial');

const DealSchema = new mongoose.Schema({
    dealId: {
      type: Number,
      required: true,
    },
    userId: {
      type: Number
    },
    userName: {
        type: String,
        required: true,
        minlength: 2,
    },
    userEmail: {
        type: String,
        required: true,
        validate: [isEmail, 'Email Inválido'],
    },
    orgId: {
        type: Number
    },
    orgName: {
        type: String,
        required: true,
        minlength: 2,
        lowercase: true,
    },
    title: {
        type: String,
    },
    date: {
        type: String
    },
    value: {
        type: Number
    },
    currency: {
        type: String
    },
    status: {
        type: String
    },
    dealPersonName: {
        type: String
    },
},{timestamps: true});

module.exports = mongoose.model('Deals', DealSchema);
