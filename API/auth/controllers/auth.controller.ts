import ErrorModel from '../../common/models/error.model'
import BaseModel from '../../common/models/base.model'
import AuthModel from '../../common/models/auth/auth.model'
import { Response, Request } from 'express'
import { Request as ORequest, Response as OResponse } from 'oauth2-server'
import oauth from '../../common/services/OAuth2/oauth2.service'

function generateToken(): string {
    return 'qwerty'
}

export async function login(req: Request, res: Response<BaseModel>): Promise<void> {
    try {
        const request = new ORequest(req)
        const response = new OResponse(res)
        const token = await oauth.token(request, response)

        console.log(token)
        res.status(201).send(new AuthModel(token.accessToken))
    } catch (err: unknown) {
        res.status(403).send(new ErrorModel(`Invalid login request : ${err.toString()}`))
    }
}

export function register(req: Request, res: Response<BaseModel>): void {
    try {
        res.status(201).send(new AuthModel(generateToken()))
    } catch (err: unknown) {
        res.status(500).send(new ErrorModel(`Invalid register request : ${err.toString()}`))
    }
}
