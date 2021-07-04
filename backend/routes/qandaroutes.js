const express = require("express");
var router = express.Router();
const Jobs = require("../models/jobs");
const Recruiters = require("../models/recruiters");
const Applicants = require("../models/applicants");
const Applications = require("../models/applications");

//@desc  _______  To find no of applications for given jobid
async function fun1(req, res) {
    let jobid = req.query.jobid;
    let collectionOfApplications = await Applications.find({ jobid: jobid });
    res.status(200).json(collectionOfApplications);
}
router.get("/getapplications", (req, res) => {
    fun1(req, res);
});


//@desc _______ To find all the applciations of a recruiter
async function fun2(req, res) {

    let recid = req.query.recid;

    let recDoc = await Recruiters.findOne({ _id: recid });
    let subobj = [];
    for (let i = 0; i < recDoc.jobsId.length; i++) {
        let jobDoc = await Jobs.findOne({ _id: recDoc.jobsId[i] });
        let applciationsFound = await Applications.find({ jobid: recDoc.jobsId[i] })
        subobj.push({
            jobDoc: jobDoc,
            applications: applciationsFound
        })
    }
    res.status(200).json(subobj);
}
router.get("/getJobs", (req, res) => {
    fun2(req, res);
});


//@desc _________________ need to send applicants docs if applciations array is sent id is present
async function fun3(req, res) {
    let applications = req.body.applications;
    let applicantsids = applications.map(e => e.applid);
    //console.log(applicantsids);
    let tobesub = [];
    for (let i = 0; i < applicantsids.length; i++) {
        let applicant = await Applicants.findOne({ _id: applicantsids[i] });
        //console.log(applicant);
        tobesub.push(applicant);
    }
    res.status(200).json(tobesub);
}

router.post("/seeApplicants", (req, res) => {
    fun3(req, res);
});



//@desc _________________ need to send applicants docs if applciations array is sent id is present
async function fun4(req, res) {
    let jobs = req.body.jobs;
    let applicantid = req.body.applid;
    let tobesend = [];
    for (let i = 0; i < jobs.length; i++) {
        //checking if job is filled
        let stat = 1; // 1 for can apply 2 applied 3 for full
        let MNA = jobs[i].maxApplications;
        let MNP = jobs[i].maxPositions;
        let flag1 = 0;
        let res = await Applications.find({ jobid: jobs[i]._id });
        let res1 = await Applications.find({ $and: [{ SOA: 3 }, { jobid: jobs[i]._id }] })
        if (res.length >= MNA || res1.length >= MNP) {
            flag1 = 1;
        }
        //checking if he is applied or not
        let flag2 = 0;
        let res3 = await Applications.find({ $and: [{ applid: applicantid }, { jobid: jobs[i]._id }] });
        if (res3.length != 0)
            flag2 = 1;
        if (flag2 != 1 && flag1 != 1) {
            stat = 1;
        } else if (flag2 == 1) {
            stat = 2;
        } else {
            stat = 3;
        }
        tobesend.push(stat);
    }
    res.status(200).json(tobesend);
}

router.post("/forsearch", (req, res) => {
    fun4(req, res);
});



async function fun5(req, res) {
    let recids = req.body;
    let tobesub = [];
    for (let i = 0; i < recids.length; i++) {
        let recDoc = await Recruiters.findOne({ _id: recids[i] });
        tobesub.push(recDoc.Name);
    }
    res.status(200).json(tobesub);
}

router.post("/recnames", (req, res) => {
    fun5(req, res);
})



module.exports = router;
