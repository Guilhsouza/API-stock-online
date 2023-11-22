const knex = require('../../connection/dbConnection')

const deleteProduct = async (req, res) => {
    const { tableName, product_id } = req.params
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
            .where({ product_id }).first()

        if (!productExists) {
            return res.status(404).json({ message: 'O produto não foi encontrado na lista!' })
        }

        const deleteProduct = await knex(tableName)
            .withSchema(usernameSchema)
            .del()
            .where({ product_id }).returning('*')

        return res.status(200).json({ message: `Produto ${productExists.product_name} foi excluido da lista com sucesso!` })
    } catch (error) {
        return res.status(500).json({ message: 'Erro interno no servidor' })
    }

}

module.exports = deleteProduct