import { Application } from 'express'
import validBearerToken from '../common/middlewares/token.validation.middleware'
import { link } from './controllers/link.controller'
import { hots, profile, spotlights } from './controllers/widgets.controller'
import { validRedditToken } from './middlewares/reddit.token.validation.middleware'
import hasLinkValidField from '../common/middlewares/verify.link.middleware'
import hasHotsValidArguments from './middlewares/verify.hots.middleware'
import { statusOf, unlinkOf } from '../common/controllers/common.controller'

const baseUrl = '/reddit'

export default function RedditRouter(app: Application): void {
    app.put(`${baseUrl}/link`, [validBearerToken, hasLinkValidField, link])
    app.put(`${baseUrl}/unlink`, [validBearerToken, validRedditToken, unlinkOf('reddit')])
    app.get(`${baseUrl}/status`, [validBearerToken, statusOf('reddit')])
    app.get(`${baseUrl}/profile`, [validBearerToken, validRedditToken, profile])
    app.get(`${baseUrl}/hots`, [validBearerToken, validRedditToken, hasHotsValidArguments, hots])
    app.get(`${baseUrl}/spotlights`, [validBearerToken, validRedditToken, spotlights])
}
