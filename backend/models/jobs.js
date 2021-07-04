const mongoose = require("mongoose")
//Creating a Job schema
const JobSchema = new mongoose.Schema({
    Title: {
        type: String,
        required: true
    },
    recid: {
        type: String,
        required: true
    },
    maxApplication: {
        type: Number,
        required: true
    },
    maxPositions: {
        type: Number,
        required: true
    },
    DOP: {
        Day: { type: Number, required: true },
        Month: { type: Number, required: true },
        Year: { type: Number, required: true },
    },
    //Deadline for application
    DFA: {
        Day: { type: Number, required: true },
        Month: { type: Number, required: true },
        Year: { type: Number, required: true },
        Hour: { type: Number, required: true },
        Minute: { type: Number, required: true },
    },
    skillsRequired: {
        type: [String],
        required: true
    },
    jobType: {
        type: Number,
        min: 1,
        max: 3,
        required: true
    },
    Duration: {
        type: Number,
        min: 0,
        max: 6,
        required: true
    },
    Salary: {
        type: Number,
        required: true
    },
    Rating: {
        type: [Number],
        required: true
    },
    avgRating: {
        type: Number,
        required: true
    }
})

module.exports = Jobs = mongoose.model("Job", JobSchema);