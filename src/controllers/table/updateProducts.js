const knex = require('../../connection/dbConnection')

const updateProdutcs = async (req, res) => {
    const { tableName, product_id } = req.params
    const { product_name, amount_stock, price, description, link } = req.body
    const usernameSchema = `${req.user.name}${req.user.id}`

    try {
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

        return res.status(200).json({ message: 'Tabela atualizada com sucesso!' })
    } catch (error) {
        return res.status(500).json({ message: 'Erro interno no servidor' })
    }

}

module.exports = updateProdutcs