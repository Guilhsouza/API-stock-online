const { Router } = require('express')

const createUser = require('../controllers/user/createUser')
const getUser = require('../controllers/user/getUser')
const login = require('../controllers/user/login')
const updateUser = require('../controllers/user/updateUser')
const deleteUser = require('../controllers/user/deleteUser')

const createTable = require('../controllers/table/createTable')
const listingTables = require('../controllers/table/listingTables')
const insertProducts = require('../controllers/table/insertProducts')
const listingProducts = require('../controllers/table/listingProducts')
const updateProdutcs = require('../controllers/table/updateProducts')
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
const deleteUserSchema = require('../schemas/deleteUserSchema')

const routes = Router()

routes.post('/user', validateBodyReq(createUserSchema), createUser)
routes.post('/user/login', validateBodyReq(loginSchema), login)
routes.get('/user/:id', getUser)

routes.use(verifyToken)

routes.patch('/user/:id', validateBodyReq(updateUserSchema), updateUser)
routes.delete('/user/:id', validateBodyReq(deleteUserSchema), deleteUser)

routes.post('/table', validateBodyReq(createTableSchema), createTable)
routes.get('/table', listingTables)
routes.delete('/table/:tableName', deleteTable)
routes.post('/table/:tableName', validateBodyReq(addProductsSchema), insertProducts)
routes.patch('/table/:tableName/:product_id', validateBodyReq(updateProductsSchema), updateProdutcs)
routes.get('/table/:tableName', listingProducts)
routes.delete('/table/:tableName/:product_id', deleteProduct)

module.exports = routes


