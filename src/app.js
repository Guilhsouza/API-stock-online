require('dotenv').config()
const express = require('express')
const userRoutes = require('./routes/userRoutes')
const tableRoutes = require('./routes/tableRoutes')
const swaggerRoute = require('./routes/swaggerRoute')

const app = express()

app.use(express.json())

app.use(swaggerRoute)
app.use(userRoutes)
app.use(tableRoutes)

module.exports = app