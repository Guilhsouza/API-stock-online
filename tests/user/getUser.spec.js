const request = require('supertest')
const app = require('../../src/app')
const knex = require('../../src/connection/dbConnection')
const user = require('../models/userModel')
const userNotPass = require('../models/userNotPassModel')

describe('Detail user test', () => {
    beforeAll(async () => {
        await knex('users').del('*')

        return createUser = await request(app).post('/user').send(user)
    })

    it('Sucessful get user', async () => {
        const response = await request(app).get(`/user/${createUser.body.id}`)

        expect(response.statusCode).toBe(200)
        expect(response.body).toEqual(
            userNotPass
        )
    })

    it('User not found', async () => {
        createUser.body.id = 1

        const response = await request(app).get(`/user/${createUser.body.id}`)

        expect(response.statusCode).toBe(404)
        expect(response.body).toEqual({
            message: expect.any(String)
        })
    })
})

