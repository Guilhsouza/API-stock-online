const request = require('supertest')
const app = require('../../src/app')
const knex = require('../../src/connection/dbConnection')
const user = require('../models/userModel')
const userNotPass = require('../models/userNotPassModel')

describe('Register Users Tests', () => {
    beforeEach(async () => {
        const db = await knex('users').del('*')
    })

    it('Sucessful register a user', async () => {
        const response = await request(app).post('/user').send(user)

        expect(response.statusCode).toBe(201)
        expect(response.body).toEqual(
            expect.objectContaining(
                userNotPass
            ))
    })

    it('registering a user with not data', async () => {
        const response = await request(app).post('/user').send({})

        expect(response.statusCode).toBe(400)
        expect(response.body).toEqual(
            expect.objectContaining({
                message: expect.any(String)
            }))
    })

    it('Registering a user without first name', async () => {
        const { first_name, ...userWithoutFname } = user

        const response = await request(app).post('/user').send(userWithoutFname)

        expect(response.statusCode).toBe(400)
        expect(response.body).toEqual(
            expect.objectContaining({
                message: expect.any(String)
            }))

    })

    it('Registering a user without last name', async () => {
        const { last_name, ...userWithoutLname } = user

        const response = await request(app).post('/user').send(userWithoutLname)

        expect(response.statusCode).toBe(400)
        expect(response.body).toEqual(
            expect.objectContaining({
                message: expect.any(String)
            }))

    })

    it('Registering a user without cellphone number', async () => {
        const { cellphone_number, ...userWithoutPhoneNum } = user

        const response = await request(app).post('/user').send(userWithoutPhoneNum)

        expect(response.statusCode).toBe(400)
        expect(response.body).toEqual(
            expect.objectContaining({
                message: expect.any(String)
            }))

    })

    it('Registering a user without email', async () => {
        const { email, ...userWithoutEmail } = user

        const response = await request(app).post('/user').send(userWithoutEmail)

        expect(response.statusCode).toBe(400)
        expect(response.body).toEqual(
            expect.objectContaining({
                message: expect.any(String)
            }))

    })

    it('Registering a user without password', async () => {
        const { password, ...userWithoutPassword } = user

        const response = await request(app).post('/user').send(userWithoutPassword)

        expect(response.statusCode).toBe(400)
        expect(response.body).toEqual(
            expect.objectContaining({
                message: expect.any(String)
            }))

    })

    it('Registering a user with a password of fewer than 6 characters', async () => {
        const response = await request(app).post('/user').send({
            first_name: 'guilherme',
            last_name: 'eduardo',
            cellphone_number: '12912345678',
            email: 'gui@gmail.com',
            password: '1234'
        })

        expect(response.statusCode).toBe(400)
        expect(response.body).toEqual(
            expect.objectContaining({
                message: expect.any(String)
            })
        )
    })

    it('Registering a user with a cellphone number containing more than 11 characters', async () => {
        const response = await request(app).post('/user').send({
            first_name: 'Guilherme',
            last_name: 'Souza',
            cellphone_number: '129123458',
            email: 'guilherme@gmail.com',
            password: '654321'
        })

        expect(response.statusCode).toBe(400)
        expect(response.body).toEqual(
            expect.objectContaining({
                message: expect.any(String)
            })
        )
    })

    it('Registering a user with letters inserted in the cellphone number', async () => {
        const response = await request(app).post('/user').send({
            first_name: 'Guilherme',
            last_name: 'Souza',
            cellphone_number: '12912345aa8',
            email: 'guilherme@gmail.com',
            password: '654321'
        })

        expect(response.statusCode).toBe(400)
        expect(response.body).toEqual(
            expect.objectContaining({
                message: expect.any(String)
            })
        )
    })

    it('Registering a user with duplicate cellphone number', async () => {
        const registerUser = await request(app).post('/user').send(user)

        const conflictResponse = await request(app).post('/user').send({
            first_name: 'Guilherme',
            last_name: 'Souza',
            cellphone_number: '12912345678',
            email: 'guilherme@gmail.com',
            password: '654321'
        })

        expect(conflictResponse.statusCode).toBe(409)
        expect(conflictResponse.body).toEqual(
            expect.objectContaining({
                message: expect.any(String)
            })
        )
    })

    it('Registering a user with duplicate email', async () => {
        const registerUser = await request(app).post('/user').send(user)

        const conflictResponse = await request(app).post('/user').send({
            first_name: 'Guilherme',
            last_name: 'Souza',
            cellphone_number: '12987654321',
            email: 'gui@gmail.com',
            password: '654321'
        })

        expect(conflictResponse.statusCode).toBe(409)
        expect(conflictResponse.body).toEqual(
            expect.objectContaining({
                message: expect.any(String)
            })
        )
    })
})