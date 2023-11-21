const { Router } = require('express')

const createUser = require('../controllers/user/createUser')
const getUser = require('../controllers/user/getUser')
const login = require('../controllers/user/login')
const updateUser = require('../controllers/user/updateUser')

const createTable = require('../controllers/table/createTable')
const insertProducts = require('../controllers/table/insertProducts')
const updateProdutcs = require('../controllers/table/updateProducts')
const listingTables = require('../controllers/table/listingTables')
const deleteProduct = require('../controllers/table/deleteProducts')
const deleteTable = require('../controllers/table/deleteTable')

const validateBodyReq = require('../middlewares/bodyValidate')
const verifyToken = require('../middlewares/confirmUserToken')

const createUserSchema = require('../schemas/createUserSchema')
const loginSchema = require('../schemas/loginSchema')
const createTableSchema = require('../schemas/createTableSchema')
const addProductsSchema = require('../schemas/addProductsSchema')
const updateProductsSchema = require('../schemas/updateProductsSchema')
const updateUserSchema = require('../schemas/updateUserSchema')

const routes = Router()

routes.post('/user', validateBodyReq(createUserSchema), createUser)
routes.post('/user/login', validateBodyReq(loginSchema), login)
routes.get('/user/:id', getUser)

routes.use(verifyToken)

routes.patch('/user/:id', validateBodyReq(updateUserSchema), updateUser)

routes.post('/table', validateBodyReq(createTableSchema), createTable)
routes.post('/table/:tableName', validateBodyReq(addProductsSchema), insertProducts)
routes.patch('/table/:tableName/:product_id', validateBodyReq(updateProductsSchema), updateProdutcs)
routes.get('/table', listingTables)
routes.delete('/table/:tableName/:product_id', deleteProduct)
routes.delete('/table/:tableName', deleteTable)

module.exports = routes


