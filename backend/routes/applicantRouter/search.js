const express = require("express");

//Stroring express router in router var
var router = express.Router();

const Applicants = require("../../models/applicants");
const Jobs = require("../../models/jobs");


//@desc == to retrive data using title and sortby

// router.get("/", (req, res) => {
//     let title = req.query.title;
//     let sortby = req.query.sortby;
//     //`/${title}/i`

//     if (sortby == undefined) {
//         sortby = "Title";
//     }
//     Jobs.find({ Title: { "$regex": `${title}`, "$options": "i" } }, null, {
//         sort: `${sortby}`
//     }).then(jobs => {
//         res.status(200).json(jobs);
//     })
// })


//@desc   for soting and filtering purposes
router.get("/", (req, res) => {
    let title = req.query.title;
    let sortby = req.query.sortby;
    let jt = req.query.jt;
    let jta = [];
    let sx = req.query.sx;
    let sy = req.query.sy;
    let d = req.query.d;
    //`/${title}/i`
    if (jt == undefined) {
        jta.push(0);
    }
    else {
        jta = [1, 2, 3];
        const ind = jta.indexOf(Number(jt));
        jta.splice(ind, 1);
    }

    if (sx == undefined) {
        sx = 0;
    }
    if (sy == undefined) {
        sy = 1000000000;
    }

    if (d == undefined) {
        d = 7;
    }

    if (sortby == undefined) {
        sortby = "Title";
    }

    if (title != undefined) {
        Jobs.find({ $and: [{ Title: { "$regex": `${title}`, "$options": "i" } }, { Salary: { $lte: sy } }, { Salary: { $gte: sx } }, { jobType: { $nin: jta } }, { Duration: { $lt: d } }] }
            , null, {
            sort: `${sortby}`
        }).then(jobs => {
            res.status(200).json(jobs);
        }).catch(err => res.json(err));
    }
    else {

        Jobs.find({ $and: [{ Salary: { $lte: sy } }, { Salary: { $gte: sx } }, { jobType: { $nin: jta } }, { Duration: { $lt: d } }] }
            , null, {
            sort: `${sortby}`
        }).then(jobs => {
            res.status(200).json(jobs);
        }).catch(err => res.json(err));
    }

})







module.exports = router;