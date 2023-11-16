const knex = require('../connection/dbConnection')

const findUserByEmail = async (email) => {
    return await knex('users').where('email', email).first()
}

module.exports = findUserByEmail