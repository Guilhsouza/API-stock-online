require('dotenv').config()
const express = require('express')
const routes = require('./routes/userRoutes')

const app = express()

app.use(express.json())

app.use(routes)

app.listen(process.env.PORT)