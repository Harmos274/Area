import { Application } from 'express'
import { token, register } from './controllers/auth.controller'
import hasLoginValidFields from './middlewares/verify.token.middleware'
import hasRegisterValidFields from './middlewares/verify.register.middleware'
import hasValidEmailFormatting from './middlewares/verify.email.middleware'

const baseUrl = '/oauth'

export default function AuthenticationRouter(app: Application): void {
    app.post(`${baseUrl}/register`, [hasRegisterValidFields, hasValidEmailFormatting, register])
    app.post(`${baseUrl}/token`, [hasLoginValidFields, token])
}
