const knex = require('../../connection/dbConnection')

const insertProducts = async (req, res) => {
    const { tableName } = req.params
    const { product_name, amount_stock, price, description, link } = req.body
    const usernameSchema = `${req.user.name}${req.user.id}`

    try {
        const tableExists = await knex.schema.hasTable(tableName).withSchema(usernameSchema)

        if (!tableExists) {
            return res.status(404).json({ message: `Tabela ${tableName} não existe` })
        }

        const insertTable = await knex(tableName).withSchema(usernameSchema).insert({ product_name, amount_stock, price, description, link }).returning('product_name')

        return res.status(201).json({ message: 'Produto criado com sucesso' })
    } catch (error) {
        return res.status(500).json({ message: 'Erro interno no servidor.' })
    }
}

module.exports = insertProducts