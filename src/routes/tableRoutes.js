const { Router } = require('express')

const createTable = require('../controllers/table/createTable')
const listingTables = require('../controllers/table/listingTables')
const insertProducts = require('../controllers/table/insertProducts')
const listingProducts = require('../controllers/table/listingProducts')
const updateProdutcs = require('../controllers/table/updateProducts')
const deleteProduct = require('../controllers/table/deleteProducts')
const deleteTable = require('../controllers/table/deleteTable')

const validateBodyReq = require('../middlewares/bodyValidate')
const verifyToken = require('../middlewares/confirmUserToken')

const createTableSchema = require('../schemas/createTableSchema')
const addProductsSchema = require('../schemas/addProductsSchema')
const updateProductsSchema = require('../schemas/updateProductsSchema')

const tableRoutes = Router()

tableRoutes.use(verifyToken)

tableRoutes.post('/table', validateBodyReq(createTableSchema), createTable)
tableRoutes.get('/table', listingTables)
tableRoutes.delete('/table/:tableName', deleteTable)

tableRoutes.post('/table/:tableName', validateBodyReq(addProductsSchema), insertProducts)
tableRoutes.get('/table/:tableName', listingProducts)
tableRoutes.patch('/table/:tableName/:product_id', validateBodyReq(updateProductsSchema), updateProdutcs)
tableRoutes.delete('/table/:tableName/:product_id', deleteProduct)

module.exports = tableRoutes