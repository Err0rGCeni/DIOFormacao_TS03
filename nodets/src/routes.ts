import { Router, Request, Response } from 'express'
import { UserController } from './controllers/UserController'
import { LoginController } from './controllers/LoginController'
import { verifyAuth } from './middleware/verifyAuth'

export const router = Router()

const userController = new UserController()
const loginController = new LoginController()

router.post('/user', userController.createUser)
router.get('/user', verifyAuth, userController.getUsers)
router.delete('/user', (request: Request, response: Response) => {
    const user = request.body
    console.log('Deletando usuário...', user)
    return response.status(200).json({ message: 'Usuário deletado'})
})
router.post('/login', loginController.login)
