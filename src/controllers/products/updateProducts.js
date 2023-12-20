const knex = require('../../connection/dbConnection')

const updateProdutcs = async (req, res) => {
    const { tableName, product_id } = req.params
    const { product_name, amount_stock, price, description, link } = req.body
    const usernameSchema = `${req.user.first_name}${req.user.id}`

    try {
        const tableExists = await knex.schema
            .hasTable(tableName)
            .withSchema(usernameSchema)

        if (!tableExists) {
            return res.status(404).json({ message: `Tabela ${tableName} não foi encontrada!` })
        }

        const productExists = await knex(tableName)
            .withSchema(usernameSchema)
            .where({ product_id })
            .first()

        if (!productExists) {
            return res.status(404).json({ message: 'O produto não foi encontrado!' })
        }

        if (!product_name && !amount_stock && !price && !description && !link) {
            return res.status(400).json({ message: 'Ao menos um campo deve ser atualizado!' })
        }

        const updateTable = await knex(tableName)
            .withSchema(usernameSchema)
            .update(req.body).where({ product_id })
            .returning('*')

        return res.status(200).json({ message: 'Produto atualizado com sucesso!' })
    } catch (error) {
        return res.status(500).json({ message: 'Erro interno no servidor' })
    }

}

module.exports = updateProdutcs