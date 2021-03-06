import { NextFunction, Request, Response } from 'express'
import ErrorModel from '../../common/models/error.model'
import { Request as ORequest, Response as OResponse } from 'oauth2-server'
import oauth from '../services/OAuth2/oauth2.service'

export default async function validBearerToken(req: Request, res: Response<ErrorModel>, next: NextFunction): Promise<Response<ErrorModel>> {
    const request = new ORequest(req)
    const response = new OResponse(res)

    try {
        res.locals.oauth = await oauth.authenticate(request, response)
        next()
    } catch (err: unknown) {
        return res.status(401).send(new ErrorModel(req.url, `Invalid authorization :${err.toString()}`))
    }
}
