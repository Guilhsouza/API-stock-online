const request = require('supertest')
const app = require('../../src/app')
const knex = require('../../src/connection/dbConnection')
const user = require('../models/userModel')
const userLogin = require('../models/userLogin')
const addProduct = require('../models/addProductModel')

describe('Delete table tests', () => {
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

        const createTable = await request(app)
            .post('/table')
            .set('authorization', `Bearer ${login.body.token}`)
            .send({ tableName: 'testTable' })

        return data = {
            token: login.body.token,
            tableName: 'testTable'
        }
    })

    afterEach(async () => {
        const deleteTable = await request(app)
            .delete('/table/testTable')
            .set('authorization', `Bearer ${data.token}`)
    })

    it('Delete table sucessful', async () => {
        const token = data.token
        const tableName = data.tableName

        const response = await request(app)
            .delete(`/table/${tableName}`)
            .set('authorization', `Bearer ${token}`)

        expect(response.statusCode).toBe(200)
        expect(response.body).toEqual({
            message: expect.any(String)
        })
    })

    it('Delete table if does not exist', async () => {
        const token = data.token

        const response = await request(app)
            .delete('/table/unexistingTable')
            .set('authorization', `Bearer ${token}`)

        expect(response.statusCode).toBe(404)
        expect(response.body).toEqual({
            message: expect.any(String)
        })

        await request(app)
            .delete('/table/')
    })

    it('Delete table without being logged', async () => {
        const tableName = data.tableName

        const response = await request(app)
            .delete(`/table/${tableName}`)

        expect(response.statusCode).toBe(401)
        expect(response.body).toEqual({
            message: expect.any(String)
        })
    })

    it('Delete table if contains products', async () => {
        const token = data.token
        const tableName = data.tableName

        const insertProduct = await request(app)
            .post(`/table/${tableName}`)
            .set('authorization', `Bearer ${token}`)
            .send(addProduct)

        const response = await request(app)
            .delete(`/table/${tableName}`)
            .set('authorization', `Bearer ${token}`)

        expect(response.statusCode).toBe(400)
        expect(response.body).toEqual({
            message: expect.any(String)
        })
    })
})