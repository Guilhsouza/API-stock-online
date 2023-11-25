const knex = require('../connection/dbConnection')

const findUserByPhoneNumber = async (phoneNumber) => {
    return await knex('users').where('cellphone_number', phoneNumber).first()
}

module.exports = findUserByPhoneNumber