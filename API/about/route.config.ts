import { Application } from 'express'
import { about } from './controllers/about.controller'
import manageBearerToken from './middlewares/token.management.middleware'

export default function AboutRouter(app: Application): void {
    app.get('/about.json', [manageBearerToken, about])
}
