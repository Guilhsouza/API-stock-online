const joi = require('joi')

const addProductsSchema = joi.object({
    product_name: joi.string()
        .required()
        .max(255)
        .messages({
            'any.required': 'O nome do produto é um campo obrigatório.',
            'string.empty': 'O nome do produto é um campo obrigatório.',
            'string.max': 'O nome do produto não pode ter mais que 255 caracteres.'
        }),

    amount_stock: joi.number()
        .required()
        .integer()
        .positive()
        .messages({
            'any.required': 'A quantidade no estoque é um campo obrigatório, podendo ser 0.',
            'number.base': 'A quantidade no estoque precisar ser um número válido.',
            'number.integer': 'O estoque precisa ser um número inteiro.',
            'number.positive': 'O estoque precisa ser um número positivo.'
        }),

    price: joi.number()
        .positive()
        .precision(2)
        .messages({
            'number.base': 'O valor precisar ser um número válido.',
            'number.integer': 'O valor precisa ser um número com somente duas casas após a virgula.',
            'number.positive': 'O valor precisa ser um número positivo.'
        }),

    description: joi.string()
        .max(255)
        .messages({
            'string.max': 'A descrição não pode ter mais que 500 caracteres.'
        }),

    link: joi.string()
})

module.exports = addProductsSchema