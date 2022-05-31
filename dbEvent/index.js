// Get .env
require('dotenv').config()

const express = require('express')

const cors = require('cors')

const app = express()

// Get routes to the variabel
const router = require('./src/route/route')

// Get Port to the variable
const port = 4000

app.use(express.json())

app.use(cors())

// Add endpoint grouping and router
app.use('/embreo/testing/', router)

// Check server-side
app.listen(port, () => console.log(`Listening on port ${port}!`))