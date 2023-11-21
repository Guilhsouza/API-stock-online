const knex = require('../../connection/dbConnection')

const getUserByID = async (req, res) => {
    const { id } = req.params

    try {
        const findUser = await knex('users').where({ id }).first()

        if (!findUser) {
            return res.status(404).json({ message: 'Usuário não encontrado!' })
        }

        const { password: _, ...userNotPass } = findUser

        return res.status(200).json(userNotPass)
    } catch (error) {
        return req.status(500).json({ message: 'Erro interno no servidor' })
    }
}

module.exports = getUserByID