const jwt = require('jsonwebtoken')
const secretKey = process.env.SECRET_KEY
const knex = require('../connection/dbConnection')

const verifyToken = async (req, res, next) => {
    const { authorization } = req.headers

    if (!authorization) {
        return res.status(401).json({ message: 'Usuário não autorizado!' })
    }

    try {
        const token = authorization.split(' ')[1]

        const verifyToken = jwt.verify(token, secretKey)

        const findUser = await knex('users').where({ id: verifyToken.id }).first()

        if (!findUser) {
            return res.status(404).json({ message: 'Usuário não encontrado!' })
        }

        const { password: _, ...userNotPass } = findUser

        req.user = userNotPass

        next()
    } catch (error) {
        return res.status(500).json({ message: 'Erro interno no servidor' })
    }

}

module.exports = verifyToken