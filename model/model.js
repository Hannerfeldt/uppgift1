const mongoose = require('mongoose');

const listSchema = new mongoose.Schema({
    listitem: String
})


module.exports = listSchema