const express = require("express")
var router = express.Router();


//Acquireiing the routers
const profile = require("./profile");
const search = require("./search");
const apply = require("./apply");


//Routes
router.use("/profile", profile);
router.use("/search", search);
router.use("/apply", apply);
module.exports = router;