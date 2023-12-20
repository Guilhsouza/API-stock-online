const request = require('supertest')
const app = require('../../src/app')
const knex = require('../../src/connection/dbConnection')
const user = require('../models/userModel')
const userLogin = require('../models/userLogin')
const addProduct = require('../models/addProductModel')

describe('Update products tests', () => {
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

        const usernameSchema = `${login.body.user.first_name}${login.body.user.id}`

        const createTable = await request(app)
            .post('/table')
            .set('authorization', `Bearer ${login.body.token}`)
            .send({ tableName: 'testTable' })

        const createProduct = await request(app)
            .post('/table/testTable')
            .set('authorization', `Bearer ${login.body.token}`)
            .send(addProduct)

        const productId = await knex('testTable')
            .withSchema(usernameSchema)
            .first()

        return data = {
            usernameSchema: usernameSchema,
            productId: productId.product_id,
            token: login.body.token,
            tableName: 'testTable'
        }
    })

    afterEach(async () => {
        const containingProduct = await knex(data.tableName)
            .withSchema(data.usernameSchema)
            .first()

        if (containingProduct) {
            const deleteProducts = await request(app)
                .delete(`/table/testTable/1`)
                .set('authorization', `Bearer ${data.token}`)
        }

        const deleteTable = await request(app)
            .delete('/table/testTable')
            .set('authorization', `Bearer ${data.token}`)
    })

    it('Delete product sucessful', async () => {
        const token = data.token
        const tableName = data.tableName
        const productId = data.productId

        const response = await request(app)
            .delete(`/table/${tableName}/${productId}`)
            .set('authorization', `Bearer ${token}`)

        expect(response.statusCode).toBe(200)
        expect(response.body).toEqual({
            message: expect.any(String)
        })
    })

    it('Delete product if the table does not exist', async () => {
        const token = data.token
        const tableName = 'unexistedTable'
        const productId = data.productId

        const response = await request(app)
            .delete(`/table/${tableName}/${productId}`)
            .set('authorization', `Bearer ${token}`)

        expect(response.statusCode).toBe(404)
        expect(response.body).toEqual({
            message: expect.any(String)
        })
    })

    it('Delete product if it does not exist', async () => {
        const token = data.token
        const tableName = data.tableName
        const productId = 999999

        const response = await request(app)
            .delete(`/table/${tableName}/${productId}`)
            .set('authorization', `Bearer ${token}`)

        expect(response.statusCode).toBe(404)
        expect(response.body).toEqual({
            message: expect.any(String)
        })
    })

    it('Delete product without being logged', async () => {
        const tableName = data.tableName
        const productId = data.productId

        const response = await request(app)
            .delete(`/table/${tableName}/${productId}`)

        expect(response.statusCode).toBe(401)
        expect(response.body).toEqual({
            message: expect.any(String)
        })
    })
})