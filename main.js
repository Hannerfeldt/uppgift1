const express = require("express");
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const router = require('./router/router')
dotenv.config({ path: './config/.env' });

var bodyParser = require('body-parser')
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

app.set("views", "views");
app.set("view engine", "ejs");

let options = {
    useNewUrlParser: true,
    useUnifiedTopology: true
}

mongoose.connect('mongodb+srv://' + process.env.DB_ADMIN + ':' + process.env.DB_PASSWORD + '@clusters-r2oal.mongodb.net/test', options)
    .then(() => {
        console.log("connected");
    }).catch((err) => {
        console.log(err);
    })





app.use(router);

port = process.env.PORT || 8000;

app.listen(port, () => console.log(`Live at ${port}...`));