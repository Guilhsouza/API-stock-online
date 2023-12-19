const request = require('supertest')
const app = require('../../src/app')
const knex = require('../../src/connection/dbConnection')
const user = require('../models/userModel')
const userLogin = require('../models/userLogin')

describe('Listing tables tests', () => {
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

        await request(app)
            .post('/table')
            .set('authorization', `Bearer ${login.body.token}`)
            .send({ tableName: 'testTable' })

        return data = {
            userId: login.body.user.id,
            token: login.body.token
        }
    })

    afterEach(async () => {
        const deleteTable = await request(app)
            .delete('/table/testTable')
            .set('authorization', `Bearer ${data.token}`)
    })

    it('Listing tables sucessful', async () => {
        const token = data.token

        const response = await request(app)
            .get('/table')
            .set('authorization', `Bearer ${token}`)

        expect(response.statusCode).toBe(200)
        expect(response.body).toEqual({
            message: expect.any(String),
            tables: expect.any(Object)
        })
    })

    it('listing tables without being logged', async () => {
        const token = data.token

        const response = await request(app)
            .get('/table')

        expect(response.statusCode).toBe(401)
        expect(response.body).toEqual({
            message: expect.any(String)
        })
    })
})