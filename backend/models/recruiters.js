const mongoose = require("mongoose")

//Creating a Job schema
const recruiterSchema = new mongoose.Schema({
    Name: {
        type: String,
        required: true
    },
    Email: {
        type: String,
        required: true
    },
    contactNum: {
        type: Number,
        required: true,
    },
    Bio: {
        type: String,
        required: true
    },
    jobsId: {
        type: [String]
    },
    Password: {
        type: String,
        required: true
    }
});

module.exports = Recruiters = mongoose.model("Recruiter", recruiterSchema);