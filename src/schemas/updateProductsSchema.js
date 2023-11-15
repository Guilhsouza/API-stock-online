const joi = require('joi')

const updateProductsSchema = joi.object({
    id: joi.number()
        .integer()
        .positive()
        .messages({
            'number.base': 'O ID precisar ser um número válido',
            'number.integer': 'O ID precisa ser um número inteiro',
            'number.positive': 'O ID precisa ser um número positivo'
        }),

    product_name: joi.string()
        .max(255)
        .messages({
            'string.empty': 'O nome do produto não pode ser vazio',
            'string.max': 'O nome do produto não pode ter mais que 255 caracteres'
        }),

    amount_stock: joi.number()
        .integer()
        .positive()
        .messages({
            'number.base': 'A quantidade no estoque precisar ser um número válido',
            'number.integer': 'O estoque precisa ser um número inteiro',
            'number.positive': 'O estoque precisa ser um número positivo'
        }),

    price: joi.number()
        .positive()
        .precision(2)
        .messages({
            'number.base': 'O valor precisar ser um número válido',
            'number.integer': 'O valor precisa ser um número com somente duas casas após a virgula',
            'number.positive': 'O valor precisa ser um número positivo'
        }),

    description: joi.string()
        .max(255)
        .messages({
            'string.empty': 'A descrição não pode estar vazia',
            'string.max': 'A descrição não pode ter mais que 500 caracteres'
        }),

    link: joi.string()
})

module.exports = updateProductsSchema