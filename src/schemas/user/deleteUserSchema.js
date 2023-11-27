const joi = require('joi')

const deleteUserSchema = joi.object({
    password: joi.string()
        .required()
        .messages({
            'any.required': 'A senha é um campo obrigatório.',
            'string.empty': 'A senha é um campo obrigatório.'
        })
})

module.exports = deleteUserSchema