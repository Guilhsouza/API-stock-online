const knex = require('../../connection/dbConnection')
const bcrypt = require('bcrypt')

const deleteUser = async (req, res) => {
    const { id } = req.params
    const { password } = req.body
    const usernameSchema = `${req.user.first_name}${req.user.id}`

    try {
        if (id !== String(req.user.id)) {
            return res.status(401).json({ message: 'usuário não autorizado!' })
        }

        const findUser = await knex('users').where({ id }).first()

        if (!findUser) {
            return res.status(404).json({ message: 'O usuário não foi encontrado!' })
        }

        const verifyPassword = await bcrypt.compare(password, findUser.password)

        if (!verifyPassword) {
            return res.status(400).json({ message: 'Senha incorreta!' })
        }

        await knex.schema
            .dropSchemaIfExists(usernameSchema, true)

        await knex('users').where({ id }).del()

        return res.status(200).json({ message: 'Usuário excluido com sucesso!' })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: 'Erro interno no servidor!' })
    }
}

module.exports = deleteUser