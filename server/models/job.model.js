const mongoose = require('mongoose')

const JobSchema = new mongoose.Schema({

    title: {
        type: String,
        required: [true, "Title is required"],
        minlength: [3, "Title must be at least 3 characters"]
    },
    company: {
        type: String,
        required: [true, "Company is required"],

    },
    salary: {
        type: Number,
        required: [true, "Salary is required"],
        min: [50000, "Salary must be at least 50000"]
    },
    isRemote: {
        type: Boolean,
    },
    hours: {
        type: String,
        required: [true, "Hours per week is required"]
    }
}, { timestamps: true })

module.exports.Job = mongoose.model("Job", JobSchema)