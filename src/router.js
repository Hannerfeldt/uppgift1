const express = require("express");
const router = express.Router();
const mongoose = require('mongoose');
const listSchema = require("../model/model")

let arr;
let tempArr;
let arrLength;
const Item = mongoose.model("listitem", listSchema);

async function createItem(data) {
    const js = new Item({
        listitem: data,
        date: Date.now()
    })
    arr.push(js)
    await js.save()
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

    tempArr = []

    setTimeout(() => {
        for (i = 0; i < 5; i++) {
            arr[i] == undefined ? console.log("end of array")
                : tempArr.push(arr[i])

        }
        arrLength = arr.length
        res.render("list", { tempArr, arrLength })
    }, 2000)

})
router.get("/:id", async (req, res) => {
    tempArr = []
    pageThing = req.params.id * 5;
    console.log("mjau")

    for (i = pageThing; i < (pageThing + 5); i++) {
        arr[i] == undefined ? console.log("end of array")
            : tempArr.push(arr[i])
    }

    arrLength = arr.length
    res.render("list", { tempArr, arrLength })
})
router.post("/", async (req, res, next) => {

    createItem(req.body.listitem);
    res.redirect("/")

})

router.get("/delete/:id", (req, res) => {

    deleteOne(req.params.id)
    res.redirect("/")

})
router.get("/update/:id", async (req, res) => {
    const itemRes = await Item.findOne({
        listitem: arr[req.params.id].listitem
    })
    index = req.params.id
    setTimeout(() => {
        res.render("update", { itemRes, index })
    }, 2000)
})

router.post("/update/:id", async (req, res) => {
    const itemRes = await Item.replaceOne(
        { listitem: arr[req.params.id].listitem },
        { listitem: req.body.listitem, date: Date.now() }
    )
    arr[req.params.id].listitem = req.body.listitem
    arr[req.params.id].date = Date.now()

    res.redirect("/")
})
router.get("/sort/sort", async (req, res) => {
    console.log("Voof")
    arr = []
    let so =  await Item.find({}).sort({date:-1})
    so.forEach((r)=>{
        arr.push(r)
    })
    //arr.sort((a, b) => a.date - b.date)
    setTimeout(() => {
        console.log(arr)    
    }, 700);
    
    res.redirect("/")
})

module.exports = { router }