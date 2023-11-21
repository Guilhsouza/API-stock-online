const joi = require('joi')

const registerValidate = joi.object({
    first_name: joi.string()
        .required()
        .messages({
            'any.required': 'O nome é um campo obrigatório.',
            'string.empty': 'O nome é um campo obrigatório.'
        }),

    last_name: joi.string()
        .required()
        .messages({
            'any.required': 'O sobrenome é um campo obrigatório.',
            'string.empty': 'O sobrenome é um campo obrigatório.'
        }),

    cellphone_number: joi.string()
        .pattern(/^[0-9]+$/)
        .length(11)
        .required()
        .messages({
            'any.required': 'O número de telefone é um campo obrigatório.',
            'string.pattern.base': 'O número de telefone pode conter somente números.',
            'string.alphanum': 'O número de telefone só pode conter números.',
            'string.length': 'O número de telefone precisa ter 11 dígitos.',
        }),

    email: joi.string()
        .email()
        .required()
        .messages({
            'any.required': 'O email é um campo obrigatório.',
            'string.empty': 'O email é um campo obrigatório.',
            'string.email': 'O campo email precisa ter um formato valido, ex: nome@exemplo.com.'
        }),

    password: joi.string()
        .min(6)
        .required()
        .messages({
            'any.required': 'A senha é um campo obrigatório.',
            'string.empty': 'A senha é um campo obrigatório.',
            'string.min': 'a senha deve conter 6 ou mais caracteres.'
        })
})

module.exports = registerValidate