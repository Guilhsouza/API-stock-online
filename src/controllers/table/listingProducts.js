const knex = require('../../connection/dbConnection')

const listingProducts = async (req, res) => {
    const { tableName } = req.params
    const usernameSchema = `${req.user.first_name}${req.user.id}`

    try {
        const tableExists = await knex.schema.hasTable(tableName).withSchema(usernameSchema)

        if (!tableExists) {
            return res.status(404).json({ message: 'A tabela não foi encontrada!' })
        }

        const listingTable = await knex(tableName).withSchema(usernameSchema)

        return res.status(200).json({ table: tableName, products: listingTable })
    } catch (error) {
        return req.status(500).json({ message: 'Erro interno no servidor.' })
    }
}

module.exports = listingProducts