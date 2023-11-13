import { UserService } from "./UserService";
import * as jwt from 'jsonwebtoken';

jest.mock('../repositories/UserRepository')
jest.mock('../database', () => {
    initialize: jest.fn()
})
jest.mock('jsonwebtoken')

const mockUserRepository = require('../repositories/UserRepository')

describe('UserService', () => {
    const userService = new UserService(mockUserRepository)
    const mockUser = {
        id_user: '123456',
        name: 'nath',
        email: 'nath@test.com',
        password: '123456'
    }

    it('Deve adicionar um novo usuário', async () => {
        mockUserRepository.createUser = jest.fn().mockImplementation(() => Promise.resolve({
            id_user: '123456',
            name: 'nath',
            email: 'nath@test.com',
            password: '123456'
        }))
        const response = await userService.createUser('nath', 'nath@test.com', '123456');
        expect(mockUserRepository.createUser).toHaveBeenCalled()
        expect(response).toMatchObject({
            id_user: '123456',
            name: 'nath',
            email: 'nath@test.com',
            password: '123456'
        })
    })

    it('Deve retornar um token de usuário', async () => {
        jest.spyOn(userService, 'getAuthenticateUser').mockImplementation(() => Promise.resolve(mockUser))
        jest.spyOn(jwt, 'sign').mockImplementation(() => 'token')
        const token = await userService.getToken('nath@test.com', '123456')
        expect(token).toBe('123456')
    })

    it('Deve retornar um erro caso não encontre um usuário', async () => {
        jest.spyOn(userService, 'getAuthenticateUser').mockImplementation(() => Promise.resolve(null))
        await expect(userService.getToken('invalid@test', '121212')).rejects.toThrowError(new Error('Email/password invalid!'))
    })
})
