const joi = require('joi')

const updateUserSchema = joi.object({
    first_name: joi.string()
        .messages({
            'string.empty': 'O nome é um campo obrigatório.'
        }),

    last_name: joi.string()
        .messages({
            'string.empty': 'O sobrenome é um campo obrigatório.'
        }),

    cellphone_number: joi.string()
        .pattern(/^[0-9]+$/)
        .length(11)
        .messages({
            'string.pattern.base': 'O número de telefone pode conter somente números.',
            'string.alphanum': 'O número de telefone só pode conter números.',
            'string.length': 'O número de telefone precisa ter 11 dígitos.',
        }),

    email: joi.string()
        .email()
        .messages({
            'string.empty': 'O email é um campo obrigatório.',
            'string.email': 'O campo email precisa ter um formato valido, ex: nome@exemplo.com.'
        }),

    password: joi.string()
        .min(6)
        .messages({
            'string.empty': 'A senha é um campo obrigatório.',
            'string.min': 'a senha deve conter 6 ou mais caracteres.'
        })
})

module.exports = updateUserSchema