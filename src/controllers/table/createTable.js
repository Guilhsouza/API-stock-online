const knex = require('../../connection/dbConnection')

const createTable = async (req, res) => {
    const { tableName } = req.body

    try {
        const usernameSchema = `${req.user.first_name}${req.user.id}`

        const createSchema = await knex.schema
            .raw(`CREATE SCHEMA IF NOT EXISTS ${usernameSchema}`)

        const validateTable = await knex.schema
            .hasTable(tableName)
            .withSchema(usernameSchema)

        if (validateTable) {
            return res.status(409).json({ message: `A tabela com nome: "${tableName}" já existe, por favor insira um nome diferente` })
        }

        const findMasterTable = await knex.schema
            .hasTable('master_table')
            .withSchema(usernameSchema)

        if (!findMasterTable) {
            const createMasterTable = await knex.schema
                .withSchema(usernameSchema)
                .createTable('master_table', (table) => {
                    table.increments('table_id')
                    table.integer('user_id')
                    table.string('table_name')
                })
        }

        await knex('master_table')
            .withSchema(usernameSchema)
            .insert({ user_id: req.user.id, table_name: tableName })

        const createTable = await knex.schema.withSchema(usernameSchema)
            .createTable(`${tableName}`, (table) => {
                table.increments('product_id')
                table.string('product_name')
                table.integer('amount_stock')
                table.integer('price')
                table.string('description', 500)
                table.string('link')
            })

        return res.status(204).send()
    } catch (error) {
        return res.status(500).json({ mensagem: 'Erro interno no servidor' })
    }
}

module.exports = createTable
