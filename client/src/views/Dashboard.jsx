import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

const Dashboard = () => {
  const [jobs, setJobs] = useState([])

  useEffect(() => {
    axios.get(`http://localhost:8000/api/jobs`)
      .then(response => {
        setJobs(response.data)
        console.log(response.data)
      })
      .catch(err => console.log(err))
  })

  const handleDelete = (deleteId) => {
    axios.delete(`http://localhost:8000/api/jobs/${deleteId}`)
      .then(response => {
        const filteredList = jobs.filter((job, i) => job._id !== deleteId)
        setJobs(filteredList)
      })
      .catch(err => console.log(err))
  }

  return (
    <div>
      <Link to="/jobs/new">Create a new job</Link>
      <table className="table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Company</th>
            <th>Salary</th>
            <th>Remote?</th>
            <th>Hours per Week</th>
            <th colSpan={2}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {
            jobs.map((job, i) => (
              <tr key={i}>
                <td><Link to={`/jobs/${job._id}`}>{job.title}</Link></td>
                <td>{job.company}</td>
                <td>${job.salary}</td>
                <td>{job.isRemote ? "Yes" : "No"}</td>
                <td>{job.hours}</td>
                <td><Link to={`/jobs/edit/${job._id}`} className="btn btn-primary">Edit</Link></td>
                <td><button className="btn btn-danger" onClick={() =>handleDelete(job._id)}>Delete</button></td>

              </tr>
            ))
          }

        </tbody>
      </table>
    </div>
  )
}

export default Dashboard