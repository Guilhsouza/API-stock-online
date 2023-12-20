const { Router } = require('express')

const createTable = require('../controllers/table/createTable')
const listingTables = require('../controllers/table/listingTables')
const deleteTable = require('../controllers/table/deleteTable')

const validateBodyReq = require('../middlewares/bodyValidate')
const verifyToken = require('../middlewares/confirmUserToken')

const createTableSchema = require('../schemas/table/createTableSchema')

const tableRoutes = Router()

tableRoutes.use(verifyToken)

tableRoutes.post('/table', validateBodyReq(createTableSchema), createTable)
tableRoutes.get('/table', listingTables)
tableRoutes.delete('/table/:tableName', deleteTable)

module.exports = tableRoutes