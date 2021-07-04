const mongoose = require("mongoose")

const ApplicationSchema = new mongoose.Schema({

    recid: {
        type: String,
        required: true
    },
    applid: {
        type: String,
        required: true
    },
    jobid: {
        type: String,
        required: true
    },
    SOP: {
        type: String,
        required: true
    },
    SOA: {
        type: Number,
        min: 1,
        max: 4,
        default: 1
    },
    //Date of application
    Doa: {
        Day: { type: Number, required: true },
        Mon: { type: Number, required: true },
        Yea: { type: Number, required: true }
    },
    Doj: {
        Day: { type: Number, required: true },
        Mon: { type: Number, required: true },
        Yea: { type: Number, required: true }
    }
})



module.exports = Applications = mongoose.model("Application", ApplicationSchema);