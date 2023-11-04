const knex = require('../connection/dbConnection')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const secretKey = require('../keys/hashKey')

const findUserByEmail = async (email) => {
    return await knex('usuarios').where('email', email).first()
}

const createUser = async (req, res) => {
    const { name, email, password } = req.body

    try {
        const findUser = await findUserByEmail(email)

        if (findUser) {
            return res.status(400).json({ message: `O Email ${email} já está sendo utilizado por outro usuário, por favor insira um email diferente.` })
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

const login = async (req, res) => {
    const { email, password } = req.body

    try {
        const findUser = await findUserByEmail(email)

        if (!findUser) {
            return res.status(404).json({ message: 'Usuário não encontrado!' })
        }

        const verifyPassword = await bcrypt.compare(password, findUser.password)

        if (!verifyPassword) {
            return res.status(400).json({ message: 'Senha incorreta!' })
        }

        const token = jwt.sign(
            { userId: findUser.id },
            secretKey,
            { expiresIn: '8h' })

        const { password: _, ...userNotPass } = findUser

        return res.status(201).json({ user: userNotPass, token })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: 'Erro interno no servidor.' })
    }

}

module.exports = {
    createUser,
    login
}