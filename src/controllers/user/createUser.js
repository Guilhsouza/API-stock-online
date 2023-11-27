const knex = require('../../connection/dbConnection')
const bcrypt = require('bcrypt')
const findUserByEmail = require('../../utils/findUserByEmail')
const findUserByPhoneNumber = require('../../utils/findUserByPhoneNumber')

const createUser = async (req, res) => {
    const { first_name, last_name, cellphone_number, email, password } = req.body

    try {
        const emailExists = await findUserByEmail(email)

        const phoneExists = await findUserByPhoneNumber(cellphone_number)

        if (emailExists || phoneExists) {
            return res.status(409).json({ message: `Email ou número de telefone já está sendo utilizado por outro usuário, por favor insira um dado diferente.` })
        }

        const passCrypt = await bcrypt.hash(password, 10)

        const user = {
            first_name,
            last_name,
            cellphone_number,
            email,
            password: passCrypt
        }

        const registerUserInDb = await knex('users').insert(user).returning('*')

        const { password: _, ...userNotPass } = registerUserInDb[0]

        return res.status(201).json(userNotPass)
    } catch (error) {
        return res.status(500).json({ message: 'Erro interno no servidor.' })
    }
}

module.exports = createUser
