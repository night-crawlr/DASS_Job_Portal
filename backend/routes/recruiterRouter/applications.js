const express = require("express");
const router = express.Router();

//Importing all schemas;

const Applicants = require("../../models/applicants");
const Jobs = require("../../models/jobs");
const Applications = require("../../models/applications");
const Recruiters = require("../../models/recruiters");


//@desc To get all the non rejected applications.
// For each job listing above, clicking them should lead to another dashboard with all
// non-rejected​ applications in view, with each applicant’s Name, Skills, Date of
// Application, Education, SOP, Rating, Stage of Application in view. The table should
// have a sort option for Name, Date of Application and applicant's rating both in
// ascending and descending order
async function display(req, res) {
    let recid = req.query.id;
    let jobid = req.query.jid;
    let sortby = req.query.sortby;
    console.log(sortby);
    //Name is in Applicants
    //Skils "  "  "
    //Education is in Applciants
    //Rating is in Applicants
    //Date of Application is in doas
    //SOP is in applications
    //SOA is in applications

    let tobesub = [];

    const LOapplications = await Applications.find({ $and: [{ recid: recid }, { jobid: jobid }, { SOA: { $ne: 4 } }] })

    for (let i = 0; i < LOapplications.length; i++) {
        let obj = {
            applicationid: "tobeknown",
            applicantid: "tobeknow",
            name: "tobeknow",
            skills: [],
            instName: [],
            startY: [],
            endY: [],
            Rating: [],
            avgrating: 0,
            doa: {},
            SOP: "tobekown", //Done
            SOA: 1 //Done
        }
        const application = LOapplications[i];
        let applicantid = application.applid;
        const applicant = await Applicants.findOne({ _id: applicantid });
        obj.applicationid = application._id;
        obj.applicantid = applicant._id;
        obj.name = applicant.Name;
        obj.skills = applicant.Skills;
        obj.instName = applicant.instName;
        obj.startY = applicant.startY;
        obj.endY = applicant.endY;
        obj.Rating = applicant.Rating;
        obj.avgrating = applicant.avgrating;
        obj.doa = application.Doa;
        obj.SOP = application.SOP;
        obj.SOA = application.SOA;
        tobesub.push(obj);
    }
    if (sortby == "name" || sortby == undefined) {
        tobesub.sort((a, b) => {
            let a1 = a.name.toLowerCase();
            let b1 = b.name.toLowerCase();

            if (a1 < b1) return -1;
            if (a1 > b1) return 1;
            return 0;
        })
    }
    else if (sortby == "avgrating") {
        tobesub.sort((a, b) => a.avgrating - b.avgrating);
    } else {
        tobesub.sort((a, b) => {
            let ay = a.doa.Yea; let by = b.doa.Yea;
            let am = a.doa.Mon; let bm = b.doa.Mon;
            let ad = a.doa.Day; let bd = b.doa.Day;
            if (ay == by) {
                if (am == bm) {
                    if (ad == bd) {
                        return 0;
                    } else {
                        return ad - bd;
                    }
                } else {
                    return am - bm;
                }
            } else {
                return ay - by;
            }
        });
    }
    res.status(200).json(tobesub);

}

router.get("/", (req, res) => {
    display(req, res);
});


//@desc router to change status of job
async function display1(req, res) {
    let newstat = req.query.s;
    let applicationid = req.query.aid;
    const application = await Applications.findOne({ _id: applicationid });
    let d = new Date();
    if (newstat == 3) {
        //ading date of joining and and change SOA and change status of all other applications of applicant to 4 
        application.Doj.Day = d.getDate();
        application.Doj.Mon = d.getMonth() + 1;
        application.Doj.Yea = d.getFullYear();
        const Applicantapplications = await Applications.find({ applid: application.applid });
        //const otherapplications = await Applicantapplications.find({ $ne: { _id: applicationid } })
        let otherapplications = [];
        for (let i = 0; i < Applicantapplications.length; i++) {
            if (Applicantapplications[i]._id != applicationid)
                otherapplications.push(Applicantapplications[i]);
        }
        for (let i = 0; i < otherapplications.length; i++) {
            otherapplications[i].SOA = 4; // making rejected
            await otherapplications[i].save();
        }
        application.SOA = newstat;
        await application.save();
        res.status(200).json({
            done: "ok"
        })
    }
    if (newstat == 4) {
        const applicant = await Applicants.findOne({ _id: application.applid });
        applicant.curappl -= 1;
        await applicant.save();
    }
    application.SOA = newstat;
    await application.save();
    res.status(200).json({
        done: "ok"
    })
};
router.get("/status", (req, res) => {
    display1(req, res);
})




module.exports = router;