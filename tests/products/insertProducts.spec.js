const request = require('supertest')
const app = require('../../src/app')
const knex = require('../../src/connection/dbConnection')
const user = require('../models/userModel')
const userLogin = require('../models/userLogin')
const addProduct = require('../models/addProductModel')

describe('Insert products tests', () => {
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

    it('Insert product sucessful', async () => {
        const token = data.token
        const tableName = data.tableName

        const response = await request(app)
            .post(`/table/${tableName}`)
            .set('authorization', `Bearer ${token}`)
            .send(addProduct)

        expect(response.statusCode).toBe(201)
        expect(response.body).toEqual({
            message: expect.any(String)
        })
    })

    it('Insert product without product name', async () => {
        const token = data.token
        const tableName = data.tableName
        const { product_name, ...productWithoutName } = addProduct

        const response = await request(app)
            .post(`/table/${tableName}`)
            .set('authorization', `Bearer ${token}`)
            .send(productWithoutName)

        expect(response.statusCode).toBe(400)
        expect(response.body).toEqual({
            message: expect.any(String)
        })
    })

    it('Insert product with product name containing more than 255 characteres', async () => {
        const token = data.token
        const tableName = data.tableName
        const { description, ...productWithoutDescription } = addProduct

        const descriptionMore255 = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce nec justo nec sem feugiat facilisis. Sed malesuada quam eu metus posuere, eu tincidunt elit tincidunt. Integer at velit vestibulum, dignissim eros ac, cursus mi. Proin in odio nec lacus imperdiet vestibulum eu eget justo. Suspendisse potenti. Duis fermentum tellus ac quam tincidunt, id suscipit justo ultrices. Morbi ut consequat nisi. Duis non dictum felis. Vestibulum tristique arcu vel risus ullamcorper, vel luctus elit ultricies. Nam malesuada, nulla in fermentum lacinia, ligula risus aliquam mi, eget accumsan arcu augue et nisl.'

        productWithoutDescription.description = descriptionMore255

        const response = await request(app)
            .post(`/table/${tableName}`)
            .set('authorization', `Bearer ${token}`)
            .send(productWithoutDescription)

        expect(response.statusCode).toBe(400)
        expect(response.body).toEqual({
            message: expect.any(String)
        })
    })

    it('Insert product without amount stock', async () => {
        const token = data.token
        const tableName = data.tableName
        const { amount_stock, ...productWithoutStock } = addProduct

        const response = await request(app)
            .post(`/table/${tableName}`)
            .set('authorization', `Bearer ${token}`)
            .send(productWithoutStock)

        expect(response.statusCode).toBe(400)
        expect(response.body).toEqual({
            message: expect.any(String)
        })
    })

    it('Insert product with amount stock not a integer', async () => {
        const token = data.token
        const tableName = data.tableName
        const { amount_stock, ...productWithoutStock } = addProduct

        productWithoutStock.amount_stock = 19.99

        const response = await request(app)
            .post(`/table/${tableName}`)
            .set('authorization', `Bearer ${token}`)
            .send(productWithoutStock)

        expect(response.statusCode).toBe(400)
        expect(response.body).toEqual({
            message: expect.any(String)
        })
    })

    it('Insert product with amount stock not a number', async () => {
        const token = data.token
        const tableName = data.tableName
        const { amount_stock, ...productWithoutStock } = addProduct

        productWithoutStock.amount_stock = 'abcde'

        const response = await request(app)
            .post(`/table/${tableName}`)
            .set('authorization', `Bearer ${token}`)
            .send(productWithoutStock)

        expect(response.statusCode).toBe(400)
        expect(response.body).toEqual({
            message: expect.any(String)
        })
    })

    it('Insert product with amount stock not a positive ', async () => {
        const token = data.token
        const tableName = data.tableName
        const { amount_stock, ...productWithoutStock } = addProduct

        productWithoutStock.amount_stock = -3000

        const response = await request(app)
            .post(`/table/${tableName}`)
            .set('authorization', `Bearer ${token}`)
            .send(productWithoutStock)

        expect(response.statusCode).toBe(400)
        expect(response.body).toEqual({
            message: expect.any(String)
        })
    })

    it('Insert product with price not a positive', async () => {
        const token = data.token
        const tableName = data.tableName
        const { price, ...productWithoutPrice } = addProduct

        productWithoutPrice.price = -4000

        const response = await request(app)
            .post(`/table/${tableName}`)
            .set('authorization', `Bearer ${token}`)
            .send(productWithoutPrice)

        expect(response.statusCode).toBe(400)
        expect(response.body).toEqual({
            message: expect.any(String)
        })
    })

    it('Insert products with the price containing more than 2 digits after the comma', async () => {
        const token = data.token
        const tableName = data.tableName
        const { price, ...productWithoutPrice } = addProduct

        productWithoutPrice.price = 19.99

        const response = await request(app)
            .post(`/table/${tableName}`)
            .set('authorization', `Bearer ${token}`)
            .send(productWithoutPrice)

        expect(response.statusCode).toBe(400)
        expect(response.body).toEqual({
            message: expect.any(String)
        })
    })
})