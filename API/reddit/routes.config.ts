import { Application } from 'express'
import validBearerToken from '../common/middlewares/token.validation.middleware'
import { link, status, unlink } from './controllers/status.controller'
import { hots, profile, spotlights } from './controllers/widgets.controller'
import { validRedditToken } from './middlewares/reddit.token.validation.middleware'
import hasLinkValidField from './middlewares/verify.link.middleware'

const baseUrl = '/reddit'

export default function RedditRouter(app: Application): void {
    app.put(`${baseUrl}/link`, [validBearerToken, hasLinkValidField, link])
    app.put(`${baseUrl}/unlink`, [validBearerToken, validRedditToken, unlink])
    app.get(`${baseUrl}/status`, [validBearerToken, status])
    app.get(`${baseUrl}/profile`, [validBearerToken, validRedditToken, profile])
    app.get(`${baseUrl}/hots`, [validBearerToken, validRedditToken, hots])
    app.get(`${baseUrl}/spotlights`, [validBearerToken, validRedditToken, spotlights])
}
