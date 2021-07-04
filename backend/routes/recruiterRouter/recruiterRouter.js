const express = require("express")
var router = express.Router();


//Acquireiing the routers
const edit = require("./edits");
const jobs = require("./jobs");
const profile = require("./profile");
const applications = require("./applications");
const employees = require("./employees")
//Routes
router.use("/edit", edit);
router.use("/jobs", jobs);
router.use("/profile", profile);
router.use("/applications",applications);
router.use("/employees",employees);



module.exports = router;