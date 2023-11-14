const joi = require('joi')

const registerValidate = joi.object({
    name: joi.string().required().messages({
        'any.required': 'O nome é um campo obrigatório',
        'string.empty': 'O nome é um campo obrigatório'
    }),

    email: joi.string().email().required().messages({
        'any.required': 'O email é um campo obrigatório.',
        'string.empty': 'O email é um campo obrigatório.',
        'string.email': 'O campo email precisa ter um formato valido, ex: nome@exemplo.com'
    }),

    password: joi.string().min(6).required().messages({
        'any.required': 'A senha é um campo obrigatório',
        'string.empty': 'A senha é um campo obrigatório',
        'string.min': 'a senha deve conter 6 ou mais caracteres'
    })
})

module.exports = registerValidate