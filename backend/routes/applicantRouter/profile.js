const express = require("express");

//Stroring express router in router var
var router = express.Router();

const Applicants = require("../../models/applicants");

//
async function Show(req, res) {

    let appDoc = Applicants.findOne({ _id: req.params.id });
    res.status(200).json(appDoc);
}
router.get("/:id", (req, res) => {
    Show(req, res);
})


// if any one comes to "/" he should supply me id and then i will submit him his profile
router.post("/:id", (req, res) => {
    let givenid = req.params.id;

    let editedapplicant = {
        Name: req.body.name,
        Email: req.body.email,
        instName: req.body.instName,
        startY: req.body.startY,
        endY: req.body.endY,
        Skills: req.body.skills,
    }



    let foundrecDoc;
    //searching for givenid in database
    Applicants.findOneAndUpdate({ _id: givenid }, editedapplicant, {
        new: true
    }).then(applicantDoc => {
        res.status(200).json(applicantDoc);
    })


});


module.exports = router;