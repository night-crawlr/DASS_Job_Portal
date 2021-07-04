const express = require("express");
const router = express.Router();

//Importing all schemas;

const Applicants = require("../../models/applicants");
const Jobs = require("../../models/jobs");
const Applications = require("../../models/applications");
const Recruiters = require("../../models/recruiters");


async function async1(req, res) {
    let resobj = [];
    let filterdapplications = await Applications.find({ $and: [{ SOA: 3 }, { recid: req.query.id }] });
    for (let i = 0; i < filterdapplications.length; i++) {
        let suboj = {
            name: "tobeknow",   // this is in applicants
            day: 0,              // this is in applications
            mon: 0,
            yea: 0,
            Jobtype: 0,          //this is in jobs
            title: "tobeknown",  //this is in jobs
            rating: [],          //this is in applicants
            avgrating: 0,
        }
        let applicantdoc = await Applicants.findOne({ _id: filterdapplications[i].applid });
        let jobDoc = await Jobs.findOne({ _id: filterdapplications[i].jobid });
        suboj.name = applicantdoc.Name;
        suboj.day = filterdapplications[i].Doj.Day;
        suboj.mon = filterdapplications[i].Doj.Mon;
        suboj.yea = filterdapplications[i].Doj.Yea;
        suboj.Jobtype = jobDoc.jobType;
        suboj.title = jobDoc.Title;
        suboj.rating = applicantdoc.Rating;
        suboj.avgrating = applicantdoc.avgrating;
        resobj.push(suboj);
    }
    res.json(resobj);
}

//to get all employees
router.get("/", (req, res) => {
    async1(req, res);
})


module.exports = router;