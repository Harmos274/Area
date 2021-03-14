import { Application } from 'express'
import validBearerToken from '../common/middlewares/token.validation.middleware'
import hasLinkValidField from '../common/middlewares/verify.link.middleware'
import { link } from './controllers/link.controller'
import { statusOf, unlinkOf } from '../common/controllers/common.controller'
import { issues, profile, spotlights } from './controllers/widget.controller'
import isGithubServiceEnabled from './middlewares/verify.github.middleware'

const baseUrl = '/github'

export default function GithubRouter(app: Application): void {
    app.put(`${baseUrl}/link`, [validBearerToken, hasLinkValidField, link])
    app.put(`${baseUrl}/unlink`, [validBearerToken, isGithubServiceEnabled, unlinkOf('github')])
    app.get(`${baseUrl}/status`, [validBearerToken, statusOf('github')])
    app.get(`${baseUrl}/profile`, [validBearerToken, isGithubServiceEnabled, profile])
    app.get(`${baseUrl}/spotlights`, [validBearerToken, isGithubServiceEnabled, spotlights])
    app.get(`${baseUrl}/issues`, [validBearerToken, isGithubServiceEnabled, issues])
}
