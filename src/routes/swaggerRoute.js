const express = require('express')
const swaggerDocument = require('../../swagger.json')
const swaggerUi = require('swagger-ui-express')

const swaggerRoutes = express();

swaggerRoutes.get("/api-docs", swaggerUi.setup(swaggerDocument));
swaggerRoutes.use(swaggerUi.serve);

module.exports = swaggerRoutes