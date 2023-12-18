const request = require('supertest')
const app = require('../../src/app')
const knex = require('../../src/connection/dbConnection')
const user = require('../models/userModel')
const userLogin = require('../models/userLogin')

describe('Create table tests', () => {
    beforeAll(async () => {
        await knex('users').delete('*')

        await request(app)
            .post('/user')
            .send(user)
    })

    beforeEach(async () => {
        const login = await request(app)
            .post('/user/login')
            .send(userLogin)

        return data = {
            userId: login.body.user.id,
            token: login.body.token
        }
    })

    it('Create table Sucessful', async () => {
        const token = data.token

        const response = await request(app)
            .post('/table')
            .set('authorization', `Bearer ${token}`)
            .send({ tableName: 'tabela1' })

        expect(response.statusCode).toBe(204)
    })

    it('Create table without being logged', async () => {
        const token = data.token

        const response = await request(app)
            .post('/table')
            .send({ tableName: 'tabela1' })

        expect(response.statusCode).toBe(401)
    })

    it('Create table with an existing name', async () => {
        const token = data.token

        const response = await request(app)
            .post('/table')
            .send({ tableName: 'tabela1' })

        expect(response.statusCode).toBe(401)
        expect(response.body).toEqual({
            message: expect.any(String)
        })
    })

    it('Create table without elements in body', async () => {
        const token = data.token

        const response = await request(app)
            .post('/table')
            .set('authorization', `Bearer ${token}`)
            .send({})

        expect(response.statusCode).toBe(400)
        expect(response.body).toEqual({
            message: expect.any(String)
        })
    })

    it('Create table with name empty', async () => {
        const token = data.token

        const response = await request(app)
            .post('/table')
            .set('authorization', `Bearer ${token}`)
            .send({ tableName: '' })

        expect(response.statusCode).toBe(400)
        expect(response.body).toEqual({
            message: expect.any(String)
        })
    })

    it('Create table with name more than 20 characters', async () => {
        const token = data.token

        const response = await request(app)
            .post('/table')
            .set('authorization', `Bearer ${token}`)
            .send({ tableName: 'tabela um com mais de vinte caracteres' })

        expect(response.statusCode).toBe(400)
        expect(response.body).toEqual({
            message: expect.any(String)
        })
    })
})