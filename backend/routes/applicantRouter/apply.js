//Importing express
const express = require("express");

const Applicants = require("../../models/applicants");
const Jobs = require("../../models/jobs");
const Applications = require("../../models/applications");
const Recruiters = require("../../models/recruiters");
//Stroring express router in router var
var router = express.Router();


async function todo(user, applDoc, res) {
    const d = new Date();
    try {
        const applDoce = await applDoc.save();
        res.status(200).json(applDoc);
    } catch (e) {
        res.status(202).json(e)
    }
}
//@desc for creatig an applixation

router.post("/", (req, res) => {
    let obj = req.body;
    const newApplication = new Applications(obj);

    newApplication.save().then(user => {
        console.log(req.body.applid);
        Applicants.findOne({ _id: req.body.applid }).then(applDoc => {
            if (!applDoc) {
                console.log(1);
                return res.status(404).json({ error: "login failed" });
            }
            console.log(2);
            //console.log(user._id);
            applDoc.appliId.push(user._id);
            console.log(3);
            applDoc.curappl += 1;
            console.log(4);
            todo(user, applDoc, res);
        }).catch(err => res.status(400).json(err));
    }).catch(err => res.status(400).json(err))
})

async function response(applid, res) {
    let resobj = [];

    let prom1 = await Applicants.findOne({ _id: applid });
    let listofapplications = prom1.appliId;
    let length = listofapplications.length;
    for (let i = 0; i < length; i++) {
        let supplyobj = {
            title: "tobeknow",
            Doj: {},
            salary: 1111,
            recname: "tobeknow",
            stage: 1
        };
        let applicationDoc = await Applications.findOne({ _id: listofapplications[i] });
        let jobDoc = await Jobs.findOne({ _id: applicationDoc.jobid });
        let recDoc = await Recruiters.findOne({ _id: applicationDoc.recid });
        supplyobj.title = jobDoc.Title;
        supplyobj.recname = recDoc.Name;
        supplyobj.salary = jobDoc.Salary;
        supplyobj.stage = applicationDoc.SOA;
        supplyobj.Doj = applicationDoc.Doj;
        resobj.push(supplyobj);
    }
    res.status(200).json(resobj);
}

//@desc for seeing all applications
router.get("/", (req, res) => {
    let applid = req.query.id;
    response(applid, res);
})



module.exports = router;
