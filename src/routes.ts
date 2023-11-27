import { Router } from 'express'
import { AuthController, UserController } from './controller'
import { verifyToken } from './middlewares'

const router = Router()

router.get('/v1/health-check', (_req, res) => res.status(200).send({ message: 'Ok'}))

router.post('/v1/login', AuthController.login)
router.post('/v1/register', AuthController.register)

router.get('/v1/users', verifyToken, UserController.findAll)
router.get('/v1/users/:id', verifyToken, UserController.findOne)

export default router