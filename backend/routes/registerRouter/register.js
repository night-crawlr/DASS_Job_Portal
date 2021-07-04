const express = require("express")
var router = express.Router();


//Acquireiing the routers
const applicantRouter = require("./registerApplicant");
const recruiterRouter = require("./registerRecruiter");



//Routes
router.use("/appl", applicantRouter);
router.use("/recr", recruiterRouter);


module.exports = router;