const request = require('supertest')
const app = require('../../src/app')
const knex = require('../../src/connection/dbConnection')
const user = require('../models/userModel')
const userLogin = require('../models/userLogin')

describe('Update User tests', () => {
    beforeAll(async () => {
        await knex('users').del('*')

        await request(app).post('/user').send(user)
    })

    beforeEach(async () => {
        const login = await request(app).post('/user/login').send(userLogin)

        return data = {
            userId: login.body.user.id,
            token: login.body.token
        }
    })

    it('update user without being loggend', async () => {
        const token = data.token

        const response = await request(app)
            .patch(`/user/${1}`)
            .set('Authorization', `Bearer ${token}`)
            .send({
                first_name: "Guilhermino"
            })

        expect(response.statusCode).toBe(401)
        expect(response.body).toEqual({
            message: expect.any(String)
        })
    })

    it('update user without elements in body', async () => {
        const userId = data.userId
        const token = data.token

        const response = await request(app)
            .patch(`/user/${userId}`)
            .set('Authorization', `Bearer ${token}`)
            .send({})

        expect(response.statusCode).toBe(400)
        expect(response.body).toEqual({
            message: expect.any(String)
        })
    })

    it('update user first name with an empty field', async () => {
        const userId = data.userId
        const token = data.token

        const response = await request(app)
            .patch(`/user/${userId}`)
            .set('Authorization', `Bearer ${token}`)
            .send({ first_name: "" })

        expect(response.statusCode).toBe(400)
        expect(response.body).toEqual({
            message: expect.any(String)
        })
    })

    it('update user last name with an empty field', async () => {
        const userId = data.userId
        const token = data.token

        const response = await request(app)
            .patch(`/user/${userId}`)
            .set('Authorization', `Bearer ${token}`)
            .send({ last_name: "" })

        expect(response.statusCode).toBe(400)
        expect(response.body).toEqual({
            message: expect.any(String)
        })
    })

    it('update user phone number with an empty field', async () => {
        const userId = data.userId
        const token = data.token

        const response = await request(app)
            .patch(`/user/${userId}`)
            .set('Authorization', `Bearer ${token}`)
            .send({ cellphone_number: '' })

        expect(response.statusCode).toBe(400)
        expect(response.body).toEqual({
            message: expect.any(String)
        })
    })

    it('update user phone number including letters', async () => {
        const userId = data.userId
        const token = data.token

        const response = await request(app)
            .patch(`/user/${userId}`)
            .set('Authorization', `Bearer ${token}`)
            .send({ cellphone_number: '123456789aa' })

        expect(response.statusCode).toBe(400)
        expect(response.body).toEqual({
            message: expect.any(String)
        })
    })

    it('update user phone number with more than 11 characters', async () => {
        const userId = data.userId
        const token = data.token

        const response = await request(app)
            .patch(`/user/${userId}`)
            .set('Authorization', `Bearer ${token}`)
            .send({ cellphone_number: '123456789123456' })

        expect(response.statusCode).toBe(400)
        expect(response.body).toEqual({
            message: expect.any(String)
        })
    })

    it('update user phone number with less than 11 characters', async () => {
        const userId = data.userId
        const token = data.token

        const response = await request(app)
            .patch(`/user/${userId}`)
            .set('Authorization', `Bearer ${token}`)
            .send({ cellphone_number: '123456789123456' })

        expect(response.statusCode).toBe(400)
        expect(response.body).toEqual({
            message: expect.any(String)
        })
    })

    it('update user phone number with a number that already exists', async () => {
        const userId = data.userId
        const token = data.token

        const response = await request(app)
            .patch(`/user/${userId}`)
            .set('Authorization', `Bearer ${token}`)
            .send({ cellphone_number: '12912345678' })

        expect(response.statusCode).toBe(409)
        expect(response.body).toEqual({
            message: expect.any(String)
        })
    })

    it('update user email with an empty field', async () => {
        const userId = data.userId
        const token = data.token

        const response = await request(app)
            .patch(`/user/${userId}`)
            .set('Authorization', `Bearer ${token}`)
            .send({ email: '' })

        expect(response.statusCode).toBe(400)
        expect(response.body).toEqual({
            message: expect.any(String)
        })
    })

    it('update user email with a number that already exists', async () => {
        const userId = data.userId
        const token = data.token

        const response = await request(app)
            .patch(`/user/${userId}`)
            .set('Authorization', `Bearer ${token}`)
            .send({ email: 'gui@gmail.com' })

        expect(response.statusCode).toBe(409)
        expect(response.body).toEqual({
            message: expect.any(String)
        })
    })

    it('update user password with less than 6 characters', async () => {
        const userId = data.userId
        const token = data.token

        const response = await request(app)
            .patch(`/user/${userId}`)
            .set('Authorization', `Bearer ${token}`)
            .send({ password: '4321' })

        expect(response.statusCode).toBe(400)
        expect(response.body).toEqual({
            message: expect.any(String)
        })
    })

    it('update user password with empty an field', async () => {
        const userId = data.userId
        const token = data.token

        const response = await request(app)
            .patch(`/user/${userId}`)
            .set('Authorization', `Bearer ${token}`)
            .send({ password: '' })

        expect(response.statusCode).toBe(400)
        expect(response.body).toEqual({
            message: expect.any(String)
        })
    })

    it('update user first name', async () => {
        const userId = data.userId
        const token = data.token

        const response = await request(app)
            .patch(`/user/${userId}`)
            .set('Authorization', `Bearer ${token}`)
            .send({ first_name: "Guilhermino" })

        expect(response.statusCode).toBe(200)
        expect(response.body).toEqual({
            message: expect.any(String)
        })
    })

    it('update user last name', async () => {
        const userId = data.userId
        const token = data.token

        const response = await request(app)
            .patch(`/user/${userId}`)
            .set('Authorization', `Bearer ${token}`)
            .send({ last_name: "Almeida" })

        expect(response.statusCode).toBe(200)
        expect(response.body).toEqual({
            message: expect.any(String)
        })
    })

    it('update user phone number', async () => {
        const userId = data.userId
        const token = data.token

        const response = await request(app)
            .patch(`/user/${userId}`)
            .set('Authorization', `Bearer ${token}`)
            .send({ cellphone_number: '12991439243' })

        expect(response.statusCode).toBe(200)
        expect(response.body).toEqual({
            message: expect.any(String)
        })
    })

    it('update user password', async () => {
        const userId = data.userId
        const token = data.token

        const response = await request(app)
            .patch(`/user/${userId}`)
            .set('Authorization', `Bearer ${token}`)
            .send({ password: '654321' })

        userLogin.password = '654321'

        expect(response.statusCode).toBe(200)
        expect(response.body).toEqual({
            message: expect.any(String)
        })
    })

    it('update user email', async () => {
        const userId = data.userId
        const token = data.token

        const response = await request(app)
            .patch(`/user/${userId}`)
            .set('Authorization', `Bearer ${token}`)
            .send({ email: 'guiAlmeida@email.com' })

        userLogin.email = 'guiAlmeida@email.com'

        expect(response.statusCode).toBe(200)
        expect(response.body).toEqual({
            message: expect.any(String)
        })
    })

})