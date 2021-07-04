const express = require("express");
const Jobs = require("../../models/jobs");
const Recruiters = require("../../models/recruiters");
var router = express.Router();



//Routing for creating dashboard for creating Jobs
//@route    For creating a job
router.post("/:id", (req, res) => {

    let givenid = req.params.id;
    let foundrecDoc;
    Recruiters.findOne({ _id: givenid }).then(recruiterDoc => {
        if (!recruiterDoc) {
            return res.status().json({ error: "login failed" });
        }
        else {
            foundrecDoc = recruiterDoc;
            //consle.log(foundrecDoc);

            var d = new Date();
            //consle.log(d.getFullYear());
            //consle.log(d.getMonth() + 1);
            //consle.log(d.getDay());
            const newJob = new Jobs({
                Title: req.body.Name,
                recid: givenid,
                maxApplication: req.body.maxapp,
                maxPositions: req.body.maxpo,
                //Deadline for application
                DOP: {
                    Day: d.getDate(),
                    Month: d.getMonth() + 1,
                    Year: d.getFullYear()
                },
                DFA: {
                    Day: req.body.date.day,
                    Month: req.body.date.month,
                    Year: req.body.date.year,
                    Hour: req.body.date.hour,
                    Minute: req.body.date.min
                },
                skillsRequired: req.body.skillsreq,
                jobType: req.body.type,
                Duration: req.body.duration,
                Salary: req.body.salary,
                Rating: [],
                avgRating: 0,
                Active: true
            });

            recruiterDoc.jobsId.push(newJob._id);
            recruiterDoc.save()
                .then(newJob.save()
                    .then(job => res.status(200).json(job))
                    .catch(err => res.status(200).json(err)))
                .catch(err => { console.log(err); res.status(200).json(err) });
        }
    }).catch(err => { console.log(err); res.status(200).json(err); });
})


//@route fordisplaying active jobs

router.get("/:id/active", (req, res) => {
    let givenid = req.params.id;
    let foundrecDoc;
    Recruiters.findOne({ _id: givenid }).then(recruiterDoc => {
        if (!recruiterDoc) {
            return res.status(200).json({ error: "login failed" });
        }
        else {
            foundrecDoc = recruiterDoc;
            let listofjobs = [];
            let length = recruiterDoc.jobsId.length;
            console.log(`************${length}***************`);
            console.log(recruiterDoc.jobsId);
            let promlist = [];
            for (let i = 0; i < length; i++) {
                let prom = new Promise((res, rej) => {
                    Jobs.findOne({ _id: recruiterDoc.jobsId[i] }).then(jobDoc => {
                        if (!jobDoc) {
                            return;
                        }
                        listofjobs.push(jobDoc);
                        res(jobDoc);
                    })
                })
                promlist.push(prom);
            }

            let superPromise = Promise.all(promlist);

            superPromise.then((arr) => {
                console.log(arr);
                res.status(200).json(arr);
            }).catch(err => {
                console.log(err);
            })
        }

    }).catch(err => { console.log(err); res.status(200).json(err) })
})



module.exports = router;
