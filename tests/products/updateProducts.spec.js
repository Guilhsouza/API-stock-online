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

    it('Update product name sucessful', async () => {
        const token = data.token
        const tableName = data.tableName
        const productId = data.productId

        const response = await request(app)
            .patch(`/table/${tableName}/${productId}`)
            .set('authorization', `Bearer ${token}`)
            .send({ product_name: 'updatingName' })

        expect(response.statusCode).toBe(200)
        expect(response.body).toEqual({
            message: expect.any(String)
        })
    })

    it('Update amount stock sucessful', async () => {
        const token = data.token
        const tableName = data.tableName
        const productId = data.productId

        const response = await request(app)
            .patch(`/table/${tableName}/${productId}`)
            .set('authorization', `Bearer ${token}`)
            .send({ amount_stock: 33 })

        expect(response.statusCode).toBe(200)
        expect(response.body).toEqual({
            message: expect.any(String)
        })
    })

    it('Update price sucessful', async () => {
        const token = data.token
        const tableName = data.tableName
        const productId = data.productId

        const response = await request(app)
            .patch(`/table/${tableName}/${productId}`)
            .set('authorization', `Bearer ${token}`)
            .send({ price: 4200 })

        expect(response.statusCode).toBe(200)
        expect(response.body).toEqual({
            message: expect.any(String)
        })
    })

    it('Update description sucessful', async () => {
        const token = data.token
        const tableName = data.tableName
        const productId = data.productId

        const response = await request(app)
            .patch(`/table/${tableName}/${productId}`)
            .set('authorization', `Bearer ${token}`)
            .send({ description: 'generic description abcde1234' })

        expect(response.statusCode).toBe(200)
        expect(response.body).toEqual({
            message: expect.any(String)
        })
    })

    it('Update link sucessful', async () => {
        const token = data.token
        const tableName = data.tableName
        const productId = data.productId

        const response = await request(app)
            .patch(`/table/${tableName}/${productId}`)
            .set('authorization', `Bearer ${token}`)
            .send({ link: 'https://www.example.com.br' })

        expect(response.statusCode).toBe(200)
        expect(response.body).toEqual({
            message: expect.any(String)
        })
    })

    it('Update product name with no characters', async () => {
        const token = data.token
        const tableName = data.tableName
        const productId = data.productId

        const response = await request(app)
            .patch(`/table/${tableName}/${productId}`)
            .set('authorization', `Bearer ${token}`)
            .send({ product_name: '' })

        expect(response.statusCode).toBe(400)
        expect(response.body).toEqual({
            message: expect.any(String)
        })
    })

    it('Update product name containing more than 255 characteres', async () => {
        const token = data.token
        const tableName = data.tableName
        const productId = data.productId

        const productNameMore255 = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum eleifend euismod venenatis. Proin tincidunt tortor vitae bibendum malesuada. Fusce ac hendrerit elit. Nullam vehicula, felis id tristique faucibus, justo purus gravida quam, nec luctus mi metus vel velit.'

        const response = await request(app)
            .patch(`/table/${tableName}/${productId}`)
            .set('authorization', `Bearer ${token}`)
            .send({ product_name: productNameMore255 })

        expect(response.statusCode).toBe(400)
        expect(response.body).toEqual({
            message: expect.any(String)
        })
    })

    it('Update product with amount stock not a integer', async () => {
        const token = data.token
        const tableName = data.tableName
        const productId = data.productId

        const response = await request(app)
            .patch(`/table/${tableName}/${productId}`)
            .set('authorization', `Bearer ${token}`)
            .send({ amount_stock: 19.99 })

        expect(response.statusCode).toBe(400)
        expect(response.body).toEqual({
            message: expect.any(String)
        })
    })

    it('Update product with amount stock not a positive', async () => {
        const token = data.token
        const tableName = data.tableName
        const productId = data.productId

        const response = await request(app)
            .patch(`/table/${tableName}/${productId}`)
            .set('authorization', `Bearer ${token}`)
            .send({ amount_stock: -3999 })

        expect(response.statusCode).toBe(400)
        expect(response.body).toEqual({
            message: expect.any(String)
        })
    })

    it('Update product with price not a positive', async () => {
        const token = data.token
        const tableName = data.tableName
        const productId = data.productId

        const response = await request(app)
            .patch(`/table/${tableName}/${productId}`)
            .set('authorization', `Bearer ${token}`)
            .send({ price: -4000 })

        expect(response.statusCode).toBe(400)
        expect(response.body).toEqual({
            message: expect.any(String)
        })
    })

    it('Update product with description containing more than 255 characteres', async () => {
        const token = data.token
        const tableName = data.tableName
        const productId = data.productId

        const descriptionMore500 = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce nec justo nec sem feugiat facilisis. Sed malesuada quam eu metus posuere, eu tincidunt elit tincidunt. Integer at velit vestibulum, dignissim eros ac, cursus mi. Proin in odio nec lacus imperdiet vestibulum eu eget justo. Suspendisse potenti. Duis fermentum tellus ac quam tincidunt, id suscipit justo ultrices. Morbi ut consequat nisi. Duis non dictum felis. Vestibulum tristique arcu vel risus ullamcorper, vel luctus elit ultricies. Nam malesuada, nulla in fermentum lacinia, ligula risus aliquam mi, eget accumsan arcu augue et nisl.'

        const response = await request(app)
            .patch(`/table/${tableName}/${productId}`)
            .set('authorization', `Bearer ${token}`)
            .send({ description: descriptionMore500 })

        expect(response.statusCode).toBe(400)
        expect(response.body).toEqual({
            message: expect.any(String)
        })
    })

    it('Update link with is a number', async () => {
        const token = data.token
        const tableName = data.tableName
        const productId = data.productId

        const response = await request(app)
            .patch(`/table/${tableName}/${productId}`)
            .set('authorization', `Bearer ${token}`)
            .send({ link: 10 })

        expect(response.statusCode).toBe(400)
        expect(response.body).toEqual({
            message: expect.any(String)
        })
    })

    it('Update products without body', async () => {
        const token = data.token
        const tableName = data.tableName
        const productId = data.productId

        const response = await request(app)
            .patch(`/table/${tableName}/${productId}`)
            .set('authorization', `Bearer ${token}`)
            .send({})

        expect(response.statusCode).toBe(400)
        expect(response.body).toEqual({
            message: expect.any(String)
        })
    })

    it('Update products without be logged', async () => {
        const tableName = data.tableName
        const productId = data.productId

        const response = await request(app)
            .patch(`/table/${tableName}/${productId}`)
            .send({ product_name: 'updatingName' })

        expect(response.statusCode).toBe(401)
        expect(response.body).toEqual({
            message: expect.any(String)
        })
    })

    it('Update products if the table does not exists', async () => {
        const token = data.token
        const tableName = 'unexistedTable'
        const productId = data.productId

        const response = await request(app)
            .patch(`/table/${tableName}/${productId}`)
            .set('authorization', `Bearer ${token}`)
            .send({ product_name: 'updatingName' })

        expect(response.statusCode).toBe(404)
        expect(response.body).toEqual({
            message: expect.any(String)
        })
    })

    it('Update products if it does not exist', async () => {
        const token = data.token
        const tableName = data.tableName
        const productId = 999999

        const response = await request(app)
            .patch(`/table/${tableName}/${productId}`)
            .set('authorization', `Bearer ${token}`)
            .send({ product_name: 'updatingName' })

        expect(response.statusCode).toBe(404)
        expect(response.body).toEqual({
            message: expect.any(String)
        })
    })
})