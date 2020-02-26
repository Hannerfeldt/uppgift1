"use strict";

var express = require("express");
var router = express.Router();
var mongoose = require('mongoose');
var listSchema = require("../model/model");

var arr = void 0;
var tempArr = void 0;
var arrLength = void 0;
var Item = mongoose.model("listitem", listSchema);

async function createItem(data) {
    var js = new Item({
        listitem: data,
        date: Date.now()
    });
    arr.push(js);
    await js.save();
}

async function getAll() {
    arr = [];
    var res = await Item.find({});
    res.forEach(function (r) {
        arr.push(r);
    });
}

async function deleteOne(i) {

    var res = await Item.deleteOne({
        _id: arr[i]._id
    });
    arr.splice(i, 1);
}
getAll();

router.get("/", async function (req, res) {

    tempArr = [];

    setTimeout(function () {
        for (i = 0; i < 5; i++) {
            arr[i] == undefined ? console.log("end of array") : tempArr.push(arr[i]);
        }
        arrLength = arr.length;
        res.render("list", { tempArr: tempArr, arrLength: arrLength });
    }, 2000);
});
router.get("/:id", async function (req, res) {
    tempArr = [];
    pageThing = req.params.id * 5;
    console.log("mjau");

    for (i = pageThing; i < pageThing + 5; i++) {
        arr[i] == undefined ? console.log("end of array") : tempArr.push(arr[i]);
    }

    arrLength = arr.length;
    res.render("list", { tempArr: tempArr, arrLength: arrLength });
});
router.post("/", async function (req, res, next) {

    createItem(req.body.listitem);
    res.redirect("/");
});

router.get("/delete/:id", function (req, res) {

    deleteOne(req.params.id);
    res.redirect("/");
});
router.get("/update/:id", async function (req, res) {
    var itemRes = await Item.findOne({
        listitem: arr[req.params.id].listitem
    });
    index = req.params.id;
    setTimeout(function () {
        res.render("update", { itemRes: itemRes, index: index });
    }, 2000);
});

router.post("/update/:id", async function (req, res) {
    var itemRes = await Item.replaceOne({ listitem: arr[req.params.id].listitem }, { listitem: req.body.listitem, date: Date.now() });
    arr[req.params.id].listitem = req.body.listitem;
    arr[req.params.id].date = Date.now();

    res.redirect("/");
});
router.get("/sort/sort", async function (req, res) {
    console.log("Voof");
    arr = [];
    var so = await Item.find({}).sort({ date: -1 });
    so.forEach(function (r) {
        arr.push(r);
    });
    //arr.sort((a, b) => a.date - b.date)
    setTimeout(function () {
        console.log(arr);
    }, 700);

    res.redirect("/");
});

module.exports = router;