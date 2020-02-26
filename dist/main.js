'use strict';

var express = require("express");
var app = express();
var mongoose = require('mongoose');
var dotenv = require('dotenv');
var router = require('./src/router');
dotenv.config({ path: './config/.env' });

var bodyParser = require('body-parser');
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(__dirname + "/public"));
app.set("views", "views");
app.set("view engine", "ejs");

var options = {
    useNewUrlParser: true,
    useUnifiedTopology: true
};

mongoose.connect('mongodb+srv://' + process.env.DB_ADMIN + ':' + process.env.DB_PASSWORD + '@clusters-r2oal.mongodb.net/test', options).then(function () {
    console.log("connected");
}).catch(function (err) {
    console.log(err);
});

app.use(router);

port = process.env.PORT || 8000;

app.listen(port, function () {
    return console.log('Live at ' + port + '...');
});

module.exports = { app: app };