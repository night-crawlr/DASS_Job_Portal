//Importing express
const express = require("express")

const Recruiters = require("../../models/recruiters")
//Stroring express router in router var
var router = express.Router();


//@request get all registerRecruiters
router.get("/", function (req, res) {
    Recruiters.find(function (err, users) {
        if (err) {
            console.log(err);
        } else {
            res.json(users);
        }
    })
});

//@request   Registering the Recruiter
router.post("/", function (req, res) {
    const newRecruiter = new Recruiters({
        Name: req.body.name,
        Email: req.body.email,
        contactNum: req.body.num,
        Bio: req.body.bio,
        jobsId: req.body.jobsId,
        Password: req.body.pass
    });

    newRecruiter.save()
        .then(user => res.status(200).json(user))
        .catch(err => res.status(400).send(err));
});



module.exports = router;    
