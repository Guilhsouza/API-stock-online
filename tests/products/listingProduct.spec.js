const request = require('supertest')
const app = require('../../src/app')
const knex = require('../../src/connection/dbConnection')
const user = require('../models/userModel')
const userLogin = require('../models/userLogin')
const addProduct = require('../models/addProductModel')

describe('Listing products tests', () => {
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

        const createProduct = await request(app)
            .post(`/table/testTable`)
            .set('authorization', `Bearer ${login.body.token}`)
            .send(addProduct)

        return data = {
            usernameSchema: `${login.body.user.first_name}${login.body.user.id}`,
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

    it('Listing products sucessful', async () => {
        const token = data.token
        const tableName = data.tableName

        const response = await request(app)
            .get(`/table/${tableName}`)
            .set('authorization', `Bearer ${token}`)

        expect(response.statusCode).toBe(200)
        expect(response.body).toEqual({
            table: expect.any(String),
            products: expect.any(Object)
        })
    })

    it('Listing products sucessful with query', async () => {
        const token = data.token
        const tableName = data.tableName
        const query = '?product_name=productExample'

        const response = await request(app)
            .get(`/table/${tableName}${query}`)
            .set('authorization', `Bearer ${token}`)

        expect(response.statusCode).toBe(200)
        expect(response.body).toEqual({
            products: expect.any(Object)
        })
    })

    it('Listing products without being logged', async () => {
        const tableName = data.tableName

        const response = await request(app)
            .get(`/table/${tableName}`)

        expect(response.statusCode).toBe(401)
        expect(response.body).toEqual({
            message: expect.any(String)
        })
    })

    it('Listing products with table not exists', async () => {
        const token = data.token
        const tableName = 'unexistedTable'

        const response = await request(app)
            .get(`/table/${tableName}`)
            .set('authorization', `Bearer ${token}`)

        expect(response.statusCode).toBe(404)
        expect(response.body).toEqual({
            message: expect.any(String)
        })
    })

    it('Listring products with product not exists', async () => {
        const token = data.token
        const tableName = data.tableName
        const query = '?product_name=unexistedProduct'

        const response = await request(app)
            .get(`/table/${tableName}${query}`)
            .set('authorization', `Bearer ${token}`)

        expect(response.statusCode).toBe(404)
        expect(response.body).toEqual({
            message: expect.any(String)
        })
    })
})
