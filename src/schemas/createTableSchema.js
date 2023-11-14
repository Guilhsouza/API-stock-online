const joi = require('joi')

const createTableSchema = joi.object({
    tableName: joi.string()
        .required()
        .max(20)
        .messages({
            'any.required': 'O nome da tabela é um campo obrigatório',
            'string.empty': 'O nome da tabela é um campo obrigatório',
            'string.max': 'O nome da tabela pode ter até 20 caracteres'
        }),
})

module.exports = createTableSchema