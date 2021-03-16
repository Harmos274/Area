import { Application } from 'express'
import validBearerToken from '../common/middlewares/token.validation.middleware'
import hasLinkValidField from '../common/middlewares/verify.link.middleware'
import { statusOf, unlinkOf } from '../common/controllers/common.controller'
import { link } from './controllers/link.controller'
import { music, podcast, profile } from './controllers/widget.controller'
import hasPlayerValidArguments from './middlewares/verify.player.middleware'
import { validSpotifyToken } from './middlewares/spotify.token.validation.middleware'

const baseUrl = '/spotify'

export default function SpotifyRouter(app: Application): void {
    app.put(`${baseUrl}/link`, [validBearerToken, hasLinkValidField, link])
    app.put(`${baseUrl}/unlink`, [validBearerToken, validSpotifyToken, unlinkOf('spotify')])
    app.get(`${baseUrl}/status`, [validBearerToken, statusOf('spotify')])
    app.get(`${baseUrl}/profile`, [validBearerToken, validSpotifyToken, profile])
    app.get(`${baseUrl}/music`, [validBearerToken, hasPlayerValidArguments, validSpotifyToken, music])
    app.get(`${baseUrl}/podcast`, [validBearerToken, hasPlayerValidArguments, validSpotifyToken, podcast])
}
