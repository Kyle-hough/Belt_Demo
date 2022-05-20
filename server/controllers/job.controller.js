//import model
const { Job } = require('../models/job.model')

//get all 
module.exports.allJobs = (req, res) => {
    Job.find()
        .then(players => res.json(players))
        .catch(err => res.status(400).json(err))
}

//create  
module.exports.createJob = (req, res) => {
    Job.create(req.body)
        .then(newJob => res.json(newJob))
        .catch(err => res.status(400).json(err))
}

//get one 
module.exports.oneJob= (req, res) => {
    Job.findOne({ _id: req.params.id })
        .then(job=> res.json(job))
        .catch(err => res.status(400).json(err))
}

//update one
module.exports.updateJob = (req, res) => {
    Job.findOneAndUpdate(
        { _id: req.params.id },
        req.body,
        { new: true, runValidators: true }
    )
        .then(updatedJob => res.json(updatedJob))
        .catch(err => res.status(400).json(err))
}

//delete
module.exports.deleteJob = (req, res) => {
    Job.deleteOne({ _id: req.params.id })
        .then(result => res.json(result))
        .catch(err => res.status(400).json(err))
}