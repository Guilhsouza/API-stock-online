const request = require('supertest')
const app = require('../../src/app')
const knex = require('../../src/connection/dbConnection')
const { object } = require('joi')

const user = {
    first_name: 'guilherme',
    last_name: 'eduardo',
    cellphone_number: '12912345678',
    email: 'gui@gmail.com',
    password: '123456'
}

describe('Register Users Tests', () => {
    beforeEach(async () => {
        const db = await knex('users').del('*')
    })

    it('Sucessful register a user', async () => {
        const response = await request(app).post('/user').send({
            first_name: 'guilherme',
            last_name: 'eduardo',
            cellphone_number: '12912345678',
            email: 'gui@gmail.com',
            password: '123456'
        })

        expect(response.statusCode).toBe(201)
        expect(response.body).toEqual(
            expect.objectContaining({
                id: expect.any(Number),
                first_name: expect.any(String),
                last_name: expect.any(String),
                cellphone_number: expect.any(String),
                email: expect.any(String),
            }))
    })
})