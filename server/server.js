//import dependencies
const express = require('express')
const cors = require('cors')
const app = express()

// config express/mongoose/cors
require("./configs/mongoose.config")
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))

// routes & logic
require("./routes/job.route")(app)

// listen to port 
app.listen(8000, () => console.log('listening on http://localhost:8000'))