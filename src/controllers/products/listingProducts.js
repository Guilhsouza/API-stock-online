const knex = require('../../connection/dbConnection')

const listingProducts = async (req, res) => {
    const { tableName } = req.params
    const { product_name } = req.query
    const usernameSchema = `${req.user.first_name}${req.user.id}`

    try {
        const tableExists = await knex.schema.hasTable(tableName).withSchema(usernameSchema)

        if (!tableExists) {
            return res.status(404).json({ message: 'A tabela ou o produto não foi encontrado!' })
        }

        if (product_name) {
            const findProduct = await knex(tableName).withSchema(usernameSchema).where({ product_name })

            if (!findProduct[0]) {
                return res.status(404).json({ message: 'A tabela ou o produto não foi encontrado!' })
            }

            return res.status(200).json({ products: findProduct })
        }

        const listingTable = await knex(tableName).withSchema(usernameSchema)

        return res.status(200).json({ table: tableName, products: listingTable })
    } catch (error) {
        return req.status(500).json({ message: 'Erro interno no servidor.' })
    }
}

module.exports = listingProducts