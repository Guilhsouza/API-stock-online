const knex = require('../../connection/dbConnection')

const deleteTable = async (req, res) => {
    const { tableName } = req.params
    const usernameSchema = `${req.user.name}${req.user.id}`

    try {
        const tableExists = await knex.schema
            .hasTable(tableName)
            .withSchema(usernameSchema)

        if (!tableExists) {
            return res.status(404).json({ message: `Tabela ${tableName} não foi encontrada!` })
        }

        const emptyTable = await knex(tableName).withSchema(usernameSchema).first()

        if (emptyTable) {
            return res.status(400).json({ message: 'A tabela só pode ser excluida se estiver vazia!' })
        }

        const deleteTable = await knex.schema.dropTable(tableName).withSchema(usernameSchema)

        return res.status(200).json({ message: 'Tabela excluída com sucesso!' })
    } catch (error) {
        return res.status(500).json({ message: 'Erro interno no servidor.' })
    }

}

module.exports = deleteTable