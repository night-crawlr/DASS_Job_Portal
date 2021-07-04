const mongoose = require("mongoose")

//Creating a Job schema
const applicantSchema = new mongoose.Schema({
    Name: {
        type: String,
        required: true
    },
    Email: {
        type: String,
        required: true
    },
    instName: {
        type: [String],
        required: true
    },
    startY: {
        type: [Number],
        required: true
    },
    endY: {
        type: [Number], required: true
    },
    Skills: {
        type: [String],
        required: true
    },
    Rating: {
        type: [Number],
        required: true
    },
    avgrating: {
        type: Number,
        required: true
    },
    appliId: { type: [String], required: true },
    curappl: {
        type: Number,
        max: 10,
        required: true
    },
    Password: {
        type: String,
        required: true
    }
})

module.exports = Applicants = mongoose.model("Applicant", applicantSchema);