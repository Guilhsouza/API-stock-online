const knex = require('../../connection/dbConnection')

const insertTable = async (req, res) => {
    const { tableName } = req.params
    const { product_name, amount_stock, price, description, link } = req.body
    const usernameSchema = `${req.user.name}${req.user.id}`

    try {
        const insertTable = await knex(tableName).withSchema(usernameSchema).insert({ product_name, amount_stock, price, description, link }).returning('product_name')

        return res.status(201).json({ message: 'Produto criado com sucesso' })
    } catch (error) {
        return res.status(500).json({ message: 'Erro interno no servidor.' })
    }
}

module.exports = insertTable