//Importing express
const express = require("express")

const Applicants = require("../../models/applicants")
//Stroring express router in router var
var router = express.Router();


//@request get all registerApplicants
router.get("/", function (req, res) {
    Applicants.find(function (err, users) {
        if (err) {
            console.log(err);
        } else {
            res.json(users);
        }
    })
});

//@request   Registering the Applicant
router.post("/", function (req, res) {
    const newApplicant = new Applicants({
        Name: req.body.name,
        Password: req.body.pass,
        Email: req.body.email,
        instName: req.body.instName,
        startY: req.body.startY,
        endY: req.body.endY,
        Skills: req.body.skills,
        Rating: [],
        avgrating: 0,
        appliId: [],
        curappl: 0
    });

    newApplicant.save()
        .then(user => res.status(200).json(user))
        .catch(err => res.status(400).send(err));
});



module.exports = router;    
