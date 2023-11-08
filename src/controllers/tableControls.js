const knex = require('../connection/dbConnection')
const pool = require('../connection/pgConnection')
const isURL = require('isurl')

const createTable = async (req, res) => {
    const { tableName } = req.body
    const { id, name } = req.user

    try {
        const usernameSchema = `${name}${id}`

        const createSchema = await pool.query(`CREATE SCHEMA IF NOT EXISTS ${usernameSchema}`)

        const validateTable = await knex.schema.hasTable(tableName).then((exists) => {
            if (exists) { return true }
        })

        if (validateTable) {
            return res.status(400).json({ message: `A tabela com nome: "${tableName}" já existe, por favor insira um nome diferente` })
        }

        const createTable = await knex.schema.withSchema(usernameSchema).createTable(`${tableName}`, (table) => {
            table.increments('product_id')
            table.string('product_name')
            table.integer('amount_stock')
            table.decimal('price', 10, 2)
            table.string('description_of_product')
            table.string('link_for_product')
        })

        return res.status(204).send()
    } catch (error) {
        console.log(error)
        return res.status(500).json({ mensagem: 'Erro interno no servidor' })
    }
}

module.exports = {
    createTable
}