const { Router } = require('express')
const createUser = require('../controllers/user/createUser')
const login = require('../controllers/user/login')
const createTable = require('../controllers/table/createTable')
const validateBodyReq = require('../middlewares/bodyValidate')
const userSchema = require('../validations/userSchemas')
const tableSchema = require('../validations/tableSchemas')
const verifyToken = require('../middlewares/confirmUserToken')

const routes = Router()

routes.post('/usuario', validateBodyReq(userSchema.registerValidate), createUser)
routes.post('/login', validateBodyReq(userSchema.loginValidate), login)

routes.use(verifyToken)

routes.post('/tabela', validateBodyReq(tableSchema.createTableSchema), createTable)

module.exports = routes