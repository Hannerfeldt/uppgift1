'use strict';

var mongoose = require('mongoose');

var listSchema = new mongoose.Schema({
    listitem: String,
    date: {
        type: Date, default: Date.now
    }
});

console.module.exports = listSchema;