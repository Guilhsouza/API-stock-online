const { Router } = require('express')
const userControls = require('../controllers/userControls')
const tableControls = require('../controllers/tableControls')
const validateBodyReq = require('../middlewares/bodyValidate')
const userSchema = require('../schemas/userSchemas')
const verifyToken = require('../middlewares/confirmUserToken')

const routes = Router()

routes.post('/usuario', validateBodyReq(userSchema.registerValidate), userControls.createUser)

routes.post('/login', validateBodyReq(userSchema.loginValidate), userControls.login)

routes.use(verifyToken)

routes.post('/tabela', tableControls.createTable)

module.exports = routes