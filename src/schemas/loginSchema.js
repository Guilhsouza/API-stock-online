const joi = require('joi')

const loginValidate = joi.object({
    email: joi.string().email().required().messages({
        'any.required': 'O email é um campo obrigatório.',
        'string.empty': 'O email é um campo obrigatório.',
        'string.email': 'O campo email precisa ter um formato valido, ex: nome@exemplo.com'
    }),

    password: joi.string().required().messages({
        'any.required': 'A senha é um campo obrigatório',
        'string.empty': 'A senha é um campo obrigatório',
    })
})

module.exports = loginValidate