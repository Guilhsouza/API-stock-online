const knex = require('../../connection/dbConnection')

const listingTables = async (req, res) => {
    const usernameSchema = `${req.user.first_name}${req.user.id}`

    try {
        const tablesForUser = await knex.select('table_name')
            .from('master_table')
            .withSchema(usernameSchema)
            .where('user_id', req.user.id).returning('table_name')

        return res.status(200).json({ message: `Tabelas do usuário ${req.user.first_name}`, tables: tablesForUser })
    } catch (error) {
        return res.status(500).json({ message: 'Erro interno no servidor' })
    }
}

module.exports = listingTables