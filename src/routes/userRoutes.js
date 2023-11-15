const { Router } = require('express')

const createUser = require('../controllers/user/createUser')
const login = require('../controllers/user/login')

const createTable = require('../controllers/table/createTable')
const insertProducts = require('../controllers/table/insertProducts')
const updateProdutcs = require('../controllers/table/updateProducts')
const listingTables = require('../controllers/table/listingTables')

const validateBodyReq = require('../middlewares/bodyValidate')
const verifyToken = require('../middlewares/confirmUserToken')

const registerValidate = require('../schemas/registerSchema')
const loginValidate = require('../schemas/loginSchema')
const createTableSchema = require('../schemas/createTableSchema')
const addProductsSchema = require('../schemas/addProductsSchema')
const updateProductsSchema = require('../schemas/updateProductsSchema')

const routes = Router()

routes.post('/user', validateBodyReq(registerValidate), createUser)
routes.post('/user/login', validateBodyReq(loginValidate), login)

routes.use(verifyToken)

routes.post('/table', validateBodyReq(createTableSchema), createTable)
routes.post('/table/:tableName', validateBodyReq(addProductsSchema), insertProducts)
routes.patch('/table/:tableName/:product_id', validateBodyReq(updateProductsSchema), updateProdutcs)
routes.get('/table', listingTables)

module.exports = routes


