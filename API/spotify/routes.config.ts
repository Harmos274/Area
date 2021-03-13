import { Application } from 'express'
import validBearerToken from '../common/middlewares/token.validation.middleware'
import hasLinkValidField from '../common/middlewares/verify.link.middleware'
import { statusOf, unlinkOf } from '../common/controllers/common.controller'
import { link } from './controllers/link.controller'
import { music, podcast, profile } from './controllers/widget.controller'
import hasPlayerValidArguments from './middlewares/verify.player.middleware'

const baseUrl = '/spotify'

export default function SpotifyRouter(app: Application): void {
    app.put(`${baseUrl}/link`, [validBearerToken, hasLinkValidField, link])
    app.put(`${baseUrl}/unlink`, [validBearerToken /* add valid spotify token */, unlinkOf('spotify')])
    app.get(`${baseUrl}/status`, [validBearerToken, statusOf('spotify')])
    app.get(`${baseUrl}/profile`, [validBearerToken, profile])
    app.get(`${baseUrl}/music`, [validBearerToken, hasPlayerValidArguments, music])
    app.get(`${baseUrl}/podcast`, [validBearerToken, hasPlayerValidArguments, podcast])
}
