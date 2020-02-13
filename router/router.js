const express = require("express");
const router = express.Router();
const mongoose = require('mongoose');
const listSchema = require("../model/model")

let arr = [];

const Item = mongoose.model("listitem", listSchema);

async function createItem(data) {
    const js = new Item({
        listitem: data
    })
    await js.save()
}

async function getItem(listname) {
}

async function getAll() {
    arr = [];
    const res = await Item.find({})
    res.forEach((r) => {
        arr.push(r)
    })

}

async function deleteOne(i) {

    const res = await Item.deleteOne({
        _id: arr[i]._id
    })
    arr.splice(i, 1);
}
getAll();

router.get("/", async (req, res) => {

    setTimeout(() => {
        res.render("list", { arr })
    }, 1000)


})
router.post("/", async (req, res, next) => {


    createItem(req.body.listitem);
    arr.push({ listitem: req.body.listitem });

    res.redirect("/");
    next();
})

router.get("/delete/:id", (req, res) => {

    deleteOne(req.params.id);
    res.redirect("/");

})
router.get("/update/:id", async (req, res) => {

    const itemRes = await Item.findOne({
        listitem: arr[req.params.id].listitem
    })
    index =  req.params.id
    setTimeout(() => {
        console.log(itemRes)
        res.render("update", { itemRes , index })
    }, 2000)
})

router.post("/update/:id", async (req, res) => {
    console.log("mjau")
    const itemRes = await Item.replaceOne(
        { listitem: arr[req.params.id].listitem },
        { listitem: req.body.listitem } 
    )
    
    arr[req.params.id].listitem = req.body.listitem

    res.redirect("/")
})


module.exports = router