const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const secretKey = process.env.SECRET_KEY
const findUserByEmail = require('../../utils/findUserByEmail')

const login = async (req, res) => {
    const { email, password } = req.body

    try {
        const findUser = await findUserByEmail(email)

        if (!findUser) {
            return res.status(404).json({ message: 'Usuário ou senha incorreto!' })
        }

        const verifyPassword = await bcrypt.compare(password, findUser.password)

        if (!verifyPassword) {
            return res.status(400).json({ message: 'Usuário ou senha incorreto!' })
        }

        const token = jwt.sign(
            { id: findUser.id },
            secretKey,
            { expiresIn: '8h' })

        const { password: _, ...userNotPass } = findUser

        return res.status(201).json({ user: userNotPass, token })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: 'Erro interno no servidor.' })
    }
}

module.exports = login