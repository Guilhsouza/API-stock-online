const { Router } = require('express')
const createUser = require('../controllers/user/createUser')
const login = require('../controllers/user/login')

const createTable = require('../controllers/table/createTable')
const insertTable = require('../controllers/table/insertTable')

const validateBodyReq = require('../middlewares/bodyValidate')
const verifyToken = require('../middlewares/confirmUserToken')

const registerValidate = require('../schemas/registerSchema')
const loginValidate = require('../schemas/loginSchema')
const createTableSchema = require('../schemas/createTableSchema')
const addProductsSchema = require('../schemas/addProductsSchema')

const routes = Router()

routes.post('/usuario', validateBodyReq(registerValidate), createUser)
routes.post('/login', validateBodyReq(loginValidate), login)

routes.use(verifyToken)

routes.post('/tabela', validateBodyReq(createTableSchema), createTable)
routes.post('/tabela/:tableName', validateBodyReq(addProductsSchema), insertTable)

module.exports = routes