import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams, useNavigate, Link } from 'react-router-dom'

const OneJob = () => {
  const { id } = useParams()
  const [job, setJob] = useState()
  const navigate = useNavigate()

  useEffect(() => {
    axios.get(`http://localhost:8000/api/jobs/${id}`)
      .then(response => setJob(response.data))
      .catch(err => navigate('/'))
  }, [id])

  const handleDelete = () => {
    axios.delete(`http://localhost:8000/api/jobs/${id}`)
    .then(response => navigate('/'))
    .cathc(err => console.error(err))
  }

  return (
    <div>
      {
        job &&
        <div>
          <h3>Title: {job.title}</h3>
          <h3>Company: {job.company}</h3>
          <h3>Salary: {job.salary}</h3>
          <h3>Remote: {job.isRemote ? "Yes" : "No"}</h3>
          <h3>Hour per Week: {job.hours}</h3>
        </div>
      }
      <Link to={"/jobs/edit/${id}"} className="btn btn-primary">Edit</Link>
      <button onClick={handleDelete} className="btn btn-danger">Delete</button>
      <Link to={"/"} className="btn btn-light">Back</Link>
    </div>
  )
}

export default OneJob