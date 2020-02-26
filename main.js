const express = require("express");
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const { router } = require('./src/router');
const dbURL = process.env.MONGO_ATLAS_URL || require('./config/config').databaseURL
const dbURL = require('./config/config').databaseURL
dotenv.config({ path: './config/.env' });

var bodyParser = require('body-parser')
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static(__dirname + "/public"))
app.set("views", "views");
app.set("view engine", "ejs");

let options = {
    useNewUrlParser: true,
    useUnifiedTopology: true
}
console.log({ dbURL })

mongoose.connect(dbURL, options)
    .then(() => {
        console.log("connected");
    }).catch((err) => {
        console.log(err);
    })


app.use(router);

port = process.env.PORT || 8000;

app.listen(port, () => console.log(`Live at ${port}...`));

module.exports = { app }