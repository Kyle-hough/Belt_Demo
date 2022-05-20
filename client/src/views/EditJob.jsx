import React, { useEffect, useState } from 'react'
import axios from "axios"
import { useParams, useNavigate, Link } from "react-router-dom"

const EditJob = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [title, setTitle] = useState("")
  const [company, setCompany] = useState("")
  const [salary, setSalary] = useState(1000000)
  const [hours, setHours] = useState("")
  const [isRemote, setIsRemote] = useState(false)
  const [errors, setErrors] = useState([])

  useEffect(() => {
    axios.get(`http://localhost:8000/api/jobs/${id}`)
      .then(response => {
        const job = response.data
        setTitle(job.title)
        setCompany(job.company)
        setSalary(job.salary)
        setIsRemote(job.isRemote)
      })
      .catch(err => console.log(err))
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    axios.put(`http://localhost:8000/api/jobs/${id}`, { title, company, salary, isRemote })
      .then(response => navigate("/"))
      .catch(err => {
        const errArr = []
        const errResData = err.response.data.errors
        console.log(errResData)
        for (const key in errResData) {
          errArr.push(errResData[key]["message"])
        }
        setErrors(errArr)
      })
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title</label>
          <input type="text" name="title" value={title}
            onChange={e => setTitle(e.target.value)} className="form-control" />
        </div>
        <div>
          <label>Company</label>
          <input type="text" name="company" value={company}
            onChange={e => setCompany(e.target.value)} className="form-control" />
        </div>
        <div>
          <label>Salary </label>
          <input type="number" name="salary" value={salary}
            onChange={e => setSalary(e.target.value)} className="form-control" />
        </div>
        <div>
          <label>Remote? </label>
          <input type="checkbox" name="isRemote" checked={isRemote}
            onChange={e => setIsRemote(e.target.checked)} />
        </div>
        <div>
          <label>Hours per Week </label>
          <select name="hours" value={hours}
            onChange={e => setHours(e.target.value)} className="form-control">
            <option hidden>Hours per Week</option>
            <option value="15-30 hours"> 15-30 hours</option>
            <option value="30-40 hours"> 30-40 hours</option>
            <option value="30-40 hours"> 35-45 hours</option>
          </select>
        </div>
        <button type="submit" className="btn btn-primary">Update a job</button>
        <Link to="/" className="btn btn-light">Cancel</Link>
      </form>
      {
        errors.map((err, i) => (
          <p key={i} style={{ color: "red" }}> {err} </p>
        ))
      }
    </div>
  )
}

export default EditJob