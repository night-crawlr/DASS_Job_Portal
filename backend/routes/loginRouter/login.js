const express = require("express")
var router = express.Router();



const Recruiters = require("../../models/recruiters")
const Applicants = require("../../models/applicants")


// //Accquerying the routers
// const applicantRouter = require("./loginApplicant");
// const recruiterRouter = require("./loginRecruiter");
//Routes
//router.use("/appl", applicantRouter);
//router.use("/recr", recruiterRouter);

router.post("/", (req, res) => {
    const email = req.body.email;
    const pass = req.body.pass;

    Recruiters.findOne({ Email: email, Password: pass }).then(recruiterDoc => {
        if (!recruiterDoc) {
            Applicants.findOne({ Email: email, Password: pass }).then(applicantDoc => {
                if (!applicantDoc) {
                    res.status(200).json({ error: "Authentication Failed!" });
                }
                else {
                    res.status(200).json(applicantDoc);
                }
            })
        }
        else {
            res.status(200).json(recruiterDoc);
        }
    })

})



//exporting Router that is created
module.exports = router;