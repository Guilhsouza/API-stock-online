const knex = require('../../connection/dbConnection')
const bcrypt = require('bcrypt')
const findUserByEmail = require('../../utils/findUserByEmail')

const createUser = async (req, res) => {
    const { name, email, password } = req.body

    try {
        const findUser = await findUserByEmail(email)

        if (findUser) {
            return res.status(409).json({ message: `O Email ${email} já está sendo utilizado por outro usuário, por favor insira um email diferente.` })
        }
        const passCrypt = await bcrypt.hash(password, 10)

        const user = {
            name,
            email,
            password: passCrypt
        }

        const registerUserInDb = await knex('usuarios').insert(user).returning('*')

        const { password: _, ...userNotPass } = registerUserInDb[0]

        return res.status(201).json(userNotPass)
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: 'Erro interno no servidor.' })
    }
}

module.exports = createUser
