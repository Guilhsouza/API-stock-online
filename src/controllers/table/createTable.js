const knex = require('../../connection/dbConnection')
const pool = require('../../connection/pgConnection')

const createTable = async (req, res) => {
    const { tableName } = req.body

    try {
        const usernameSchema = `${req.user.name}${req.user.id}`

        const createSchema = await pool.query(`CREATE SCHEMA IF NOT EXISTS ${usernameSchema}`)

        const validateTable = await knex.schema.hasTable(tableName).withSchema(usernameSchema)

        if (validateTable) {
            return res.status(400).json({ message: `A tabela com nome: "${tableName}" já existe, por favor insira um nome diferente` })
        }

        const createTable = await knex.schema.withSchema(usernameSchema).createTable(`${tableName}`, (table) => {
            table.increments('product_id')
            table.string('product_name')
            table.integer('amount_stock')
            table.integer('price')
            table.string('description', 500)
            table.string('link')
        })

        return res.status(204).send()
    } catch (error) {
        console.log(error)
        return res.status(500).json({ mensagem: 'Erro interno no servidor' })
    }
}

module.exports = createTable
