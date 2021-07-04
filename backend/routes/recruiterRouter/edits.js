const express = require("express");
var router = express.Router();
const Jobs = require("../../models/jobs");
const Recruiters = require("../../models/recruiters");
//@route 
//desc  :    To delete a job
router.get("/delete/:id", (req, res) => {
    let recid = req.params.id;
    let jobid = req.query.jobid;
    //delete a jobid 

    let foundrecDoc;
    Recruiters.findOne({ _id: recid }).then(recruiterDoc => {
        if (!recruiterDoc) {
            return res.status(404).json({ error: "login failed" });
        }
        else {
            foundrecDoc = recruiterDoc;
            //    console.log(foundrecDoc);
            recruiterDoc.jobsId = recruiterDoc.jobsId.filter(item => item !== jobid);
            let prom1 = new Promise((res, rej) => {
                Jobs.findOneAndDelete({ _id: jobid }).then(
                    jobs => {
                        res(jobs);
                    }
                );
            })
            let prom2 = new Promise((res, rej) => {
                recruiterDoc.save().then(users => {
                    res(users);
                })
            })
            let promAll = Promise.all([prom1, prom2]);
            promAll.then((arr) => {
                res.status(200).json({ done: true });
            })
        }

    })
});

//@route
//desc    : TO get and edit options
router.get("/:id", (req, res) => {
    let recid = req.params.id;
    let jobid = req.query.jobid;
    let mna = req.query.mna;
    let mnp = req.query.mnp;
    let day = req.query.day;
    let mon = req.query.mon;
    let yea = req.query.yea;
    let hr = req.query.hr;
    let min = req.query.min;


    let foundrecDoc;
    Recruiters.findOne({ _id: recid }).then(recruiterDoc => {
        if (!recruiterDoc) {
            return res.status(404).json({ error: "login failed" });
        }
        else {
            foundrecDoc = recruiterDoc;
            Jobs.findOne({ _id: jobid }).then(jobDoc => {

                if (!jobDoc) {
                    console.log(jobDoc)
                    return res.status(404).json({ error: "job no" });
                }

                console.log(mna, mnp, day, mon, yea, min);

                if (mna != undefined) {
                    jobDoc.maxApplication = mna;
                } if (mnp != undefined) {
                    jobDoc.maxPositions = mnp;
                }
                if (day != undefined) {
                    jobDoc.DFA.Day = day;
                }
                if (mon != undefined) {
                    jobDoc.DFA.Month = mon;
                }
                if (yea != undefined) {
                    jobDoc.DFA.Year = yea;
                }
                if (hr != undefined) {
                    jobDoc.DFA.Hour = hr;
                }
                if (min != undefined) {
                    jobDoc.DFA.Minute = min;
                }
                jobDoc.save()
                    .then(user => res.status(200).json(user))
                    .catch(err => res.status(400).json({ error: "Saving error!" }));
            })
        }

    })
});





module.exports = router;