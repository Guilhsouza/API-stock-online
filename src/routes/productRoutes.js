const { Router } = require('express')

const insertProducts = require('../controllers/products/insertProducts')
const listingProducts = require('../controllers/products/listingProducts')
const updateProdutcs = require('../controllers/products/updateProducts')
const deleteProduct = require('../controllers/products/deleteProducts')

const validateBodyReq = require('../middlewares/bodyValidate')
const verifyToken = require('../middlewares/confirmUserToken')

const addProductsSchema = require('../schemas/products/addProductsSchema')
const updateProductsSchema = require('../schemas/products/updateProductsSchema')

const productRoutes = Router()

productRoutes.use(verifyToken)

productRoutes.post('/table/:tableName', validateBodyReq(addProductsSchema), insertProducts)
productRoutes.get('/table/:tableName', listingProducts)
productRoutes.patch('/table/:tableName/:product_id', validateBodyReq(updateProductsSchema), updateProdutcs)
productRoutes.delete('/table/:tableName/:product_id', deleteProduct)

module.exports = productRoutes