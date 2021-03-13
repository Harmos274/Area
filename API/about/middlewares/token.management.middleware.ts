import { NextFunction, Request, Response } from 'express'
import ErrorModel from '../../common/models/error.model'
import { Request as ORequest, Response as OResponse } from 'oauth2-server'
import oauth from '../../common/services/OAuth2/oauth2.service'

export default async function manageBearerToken(req: Request, res: Response<ErrorModel>, next: NextFunction): Promise<void> {
    const request = new ORequest(req)
    const response = new OResponse(res)

    try {
        res.locals.oauth = await oauth.authenticate(request, response)
        next()
    } catch (err: unknown) {
        next()
    }
}
