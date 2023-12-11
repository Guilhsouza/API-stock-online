const request = require('supertest')
const app = require('../../src/app')
const knex = require('../../src/connection/dbConnection')
const user = require('../models/userModel')
const userNotPass = require('../models/userNotPassModel')

describe('Login User tests', () => {
    beforeAll(async () => {
        await knex('users').del('*')

        await request(app).post('/user').send(user)
    })

    beforeEach(async () => {
        userLogin = {
            email: 'gui@gmail.com',
            password: '123456'
        }
    })

    it('Sucessful login', async () => {
        const response = await request(app).post('/user/login').send(userLogin)

        expect(response.statusCode).toBe(200)
        expect(response.body).toEqual(
            expect.objectContaining({
                user: userNotPass,
                token: expect.any(String)
            })
        )
    })

    it('Empty body', async () => {
        const response = await request(app).post('/user/login').send({})

        expect(response.statusCode).toBe(400)
        expect(response.body).toEqual(
            expect.objectContaining({
                message: expect.any(String)
            })
        )
    })

    it('User not exists', async () => {
        userLogin.email = 'guilherme@gmail.com'

        const response = await request(app).post('/user/login').send(userLogin)

        expect(response.statusCode).toBe(400)
        expect(response.body).toEqual({
            message: expect.any(String)
        })
    })

    it('invalid email', async () => {
        userLogin.email = 'guilherme@gmail'

        const response = await request(app).post('/user/login').send(userLogin)

        expect(response.statusCode).toBe(400)
        expect(response.body).toEqual({
            message: expect.any(String)
        })
    })

    it('invalid password', async () => {
        userLogin.password = '654321'

        const response = await request(app).post('/user/login').send(userLogin)

        expect(response.statusCode).toBe(400)
        expect(response.body).toEqual({
            message: expect.any(String)
        })
    })

    it('password not a string', async () => {
        userLogin.password = 123456

        const response = await request(app).post('/user/login').send(userLogin)

        expect(response.statusCode).toBe(400)
        expect(response.body).toEqual({
            message: expect.any(String)
        })
    })
})