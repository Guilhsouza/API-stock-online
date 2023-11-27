const { Router } = require('express')

const createUser = require('../controllers/user/createUser')
const updateUser = require('../controllers/user/updateUser')
const deleteUser = require('../controllers/user/deleteUser')
const getUser = require('../controllers/user/getUser')
const login = require('../controllers/user/login')

const validateBodyReq = require('../middlewares/bodyValidate')
const verifyToken = require('../middlewares/confirmUserToken')

const createUserSchema = require('../schemas/createUserSchema')
const updateUserSchema = require('../schemas/updateUserSchema')
const deleteUserSchema = require('../schemas/deleteUserSchema')
const loginSchema = require('../schemas/loginSchema')

const userRoutes = Router()

userRoutes.post('/user', validateBodyReq(createUserSchema), createUser)
userRoutes.post('/user/login', validateBodyReq(loginSchema), login)
userRoutes.get('/user/:id', getUser)

userRoutes.use(verifyToken)

userRoutes.patch('/user/:id', validateBodyReq(updateUserSchema), updateUser)
userRoutes.delete('/user/:id', validateBodyReq(deleteUserSchema), deleteUser)

module.exports = userRoutes


