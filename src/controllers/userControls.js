const knex = require('../connection/dbConnection')
const bcrypt = require('bcrypt')

const createUser = async (req, res) => {
    const { name, email, password } = req.body
    try {
        const registeredEmail = await knex('usuarios').where('email', email).first()

        if (registeredEmail) {
            return res.status(400).json({ mensagem: `O Email ${email} já está sendo utilizado por outro usuário, por favor insira um email diferente.` })
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
        return res.status(500).json({ mensagem: 'Erro interno no servidor' })
    }
}

module.exports = {
    createUser
}