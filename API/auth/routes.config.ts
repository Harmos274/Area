import { Application } from 'express'
import { login, register } from './controllers/auth.controller'
import hasLoginValidFields from './middlewares/verify.login.middleware'
import hasRegisterValidFields from './middlewares/verify.register.middleware'

const baseUrl = '/oauth'

export default function AuthenticationRouter(app: Application): void {
    app.post(`${baseUrl}/register`, [hasRegisterValidFields, register])
    app.post(`${baseUrl}/token`, [hasLoginValidFields, login])
}
