const request = require('supertest')
const app = require('../../src/app')
const knex = require('../../src/connection/dbConnection')
const user = require('../models/userModel')
const userLogin = require('../models/userLogin')

describe('Delete user tests', () => {
    beforeAll(async () => {
        await knex('users').del('*')

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

    it('Delete user without being logged', async () => {
        const token = data.token

        const response = await request(app)
            .delete(`/user/${1}`)
            .set('Authorization', `Bearer ${token}`)
            .send({
                password: '123456'
            })

        expect(response.statusCode).toBe(401)
        expect(response.body).toEqual({
            message: expect.any(String)
        })
    })

    it('Delete user but not insert password', async () => {
        const userId = data.userId
        const token = data.token

        const response = await request(app)
            .delete(`/user/${userId}`)
            .set('Authorization', `Bearer ${token}`)
            .send({})

        expect(response.statusCode).toBe(400)
        expect(response.body).toEqual({
            message: expect.any(String)
        })
    })

    it('Delete user if wrong password', async () => {
        const userId = data.userId
        const token = data.token

        const response = await request(app)
            .delete(`/user/${userId}`)
            .set('Authorization', `Bearer ${token}`)
            .send({
                password: '12345'
            })

        expect(response.statusCode).toBe(400)
        expect(response.body).toEqual({
            message: expect.any(String)
        })
    })

    it('Delete user but user not exists', async () => {
        const userId = data.userId
        const token = data.token

        await request(app)
            .delete(`/user/${userId}`)
            .set('Authorization', `Bearer ${token}`)
            .send({
                password: '123456'
            })

        const response = await request(app)
            .delete(`/user/${userId}`)
            .set('Authorization', `Bearer ${token}`)
            .send({
                password: '123456'
            })

        await request(app).post('/user').send(user)

        expect(response.statusCode).toBe(404)
        expect(response.body).toEqual({
            message: expect.any(String)
        })
    })

    it('Delete user sucessfull', async () => {
        const userId = data.userId
        const token = data.token

        const response = await request(app)
            .delete(`/user/${userId}`)
            .set('Authorization', `Bearer ${token}`)
            .send({
                password: '123456'
            })

        expect(response.statusCode).toBe(200)
        expect(response.body).toEqual({
            message: expect.any(String)
        })
    })
})