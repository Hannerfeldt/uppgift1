const mongoose = require('mongoose');

const listSchema = new mongoose.Schema({
    listitem: String,
    date: {
        type: Date, default: Date.now
    }

})


module.exports = listSchema