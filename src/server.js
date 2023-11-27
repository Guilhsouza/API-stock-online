const app = require('./app')

const PORT = process.env.PORT || 3001

const server = app.listen(PORT)

module.exports = server