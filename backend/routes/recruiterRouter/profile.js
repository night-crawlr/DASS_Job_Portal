const express = require("express");

//Stroring express router in router var
var router = express.Router();

const Recruiters = require("../../models/recruiters");
const Jobs = require("../../models/jobs");

// if any one comes to "/" he should supply me id and then i will submit him his profile
router.get("/:id", (req, res) => {
    let username = req.query.username;
    let email = req.query.email;
    let cno = req.query.cno;
    let bio = req.query.bio;
    let givenid = req.params.id;

    let foundrecDoc;
    //searching for givenid in database
    Recruiters.findOne({ _id: givenid }).then(recruiterDoc => {
        if (!recruiterDoc) {
            return res.status(404).json({ error: "login failed" });
        }
        else {
            foundrecDoc = recruiterDoc;
            if (username != undefined) // ie in querystring the username query is present
            {
                //so update the username
                recruiterDoc.Name = username;
            }
            if (email != undefined) {
                recruiterDoc.Email = email;
            }
            if (cno != undefined) // ie in querystring the username query is present
            {
                //so update the username
                recruiterDoc.contactNum = cno;
            }
            if (bio != undefined) {
                recruiterDoc.Bio = bio;
            }
            //recruiterDoc.save().then(user => res.status(200).json(user)).catch(err => res.status(400).json({ error: "Saving error!" }));
            recruiterDoc.save().then(user => {
                let length = user.jobsId.length;
                let promlist = [];
                for (let i = 0; i < length; i++) {
                    let prom = new Promise((res, rej) => {
                        Jobs.findOneAndUpdate({ _id: user.jobsId[i] }, { Email: user.Email, RecruiterName: user.Name }).then(jobDoc => {
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
                superPromise.then(res.status(200).json(user)).catch(err => {
                    console.log(err);
                })
            }).catch(err => res.status(400).json(err))
        }
    })


});


module.exports = router;