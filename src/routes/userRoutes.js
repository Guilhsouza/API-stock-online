const { Router } = require('express')
const controls = require('../controllers/userControls')
const validateBodyReq = require('../middlewares/bodyValidate')
const userSchema = require('../schemas/userSchemas')

const routes = Router()

routes.post('/usuario', validateBodyReq(userSchema.registerValidate), controls.createUser)

module.exports = routes