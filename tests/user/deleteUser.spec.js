const request = require('supertest')
const app = require('../../src/app')
const knex = require('../../src/connection/dbConnection')
const user = require('../models/userModel')
const userLogin = require('../models/userLogin')

describe('Delete user tests', () => {
    beforeAll(async () => {
        await knex('users').del('*')

        await request(app).post('/user').send(user)
    })

    beforeEach(async () => {
        return login = await request(app).post('/user/login').send(userLogin)
    })

    it('Delete user without being logged', async () => {
        const response = await request(app).delete(`/user/${1}`).send({
            password: '123456'
        })

        expect(response.statusCode).toBe(401)
        expect(response.body).toEqual({
            message: expect.any(String)
        })
    })

    it('Delete user but not insert password', async () => {
        const userId = login.body.user.id

        const response = await request(app).delete(`/user/${userId}`).send({})

        expect(response.statusCode).toBe(400)
        expect(response.body).toEqual({
            message: expect.any(String)
        })
    })
})