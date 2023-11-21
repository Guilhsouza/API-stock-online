const knex = require('../../connection/dbConnection')
const bcrypt = require('bcrypt')
const findUserByEmail = require('../../utils/findUserByEmail')
const findUserByPhoneNumber = require('../../utils/findUserByPhoneNumber')

const updateUser = async (req, res) => {
    const { id } = req.params
    const { first_name, last_name, cellphone_number, email, password } = req.body

    try {
        if (id !== String(req.user.id)) {
            return res.status(400).json({ message: 'usuário não autorizado!' })
        }

        const userExists = await knex('users')
            .where({ id }).first()

        if (!userExists) {
            return res.status(404).json({ message: `Usuário ${first_name} não foi encontrado(a)!` })
        }

        if (!first_name && !last_name && !cellphone_number && !email && !password) {
            return res.status(400).json({ message: 'Ao menos um campo deve ser atualizado!' })
        }

        const emailExists = await findUserByEmail(email)

        if (emailExists) {
            return res.status(409).json({ message: `O Email ${email} já está sendo utilizado por outro usuário, por favor insira um email diferente.` })
        }

        const phoneExists = await findUserByPhoneNumber(cellphone_number)

        if (phoneExists) {
            return res.status(409).json({ message: `O telefone ${cellphone_number} já está sendo utilizado por outro usuário, por favor insira um número diferente.` })
        }

        const updateUser = await knex('users')
            .update(req.body).where({ id })

        if (password) {
            const passCrypt = await bcrypt.hash(password, 10)

            const updateUser = await knex('users')
                .update('password', passCrypt).where({ id })
        }

        return res.status(200).json({ message: 'Usuário atualizado com sucesso!' })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: 'Erro interno no servidor' })
    }

}

module.exports = updateUser