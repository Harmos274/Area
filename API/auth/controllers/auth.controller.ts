import ErrorModel from '../../common/models/error.model'
import { Response, Request } from 'express'
import { Request as ORequest, Response as OResponse, Token } from 'oauth2-server'
import oauth from '../../common/services/OAuth2/oauth2.service'
import OauthResponseModel from '../models/oauth.response.model'
import DatabaseService from '../../common/services/database/database.service'
import RegisterRequestModel from '../models/register.request.model'
import RegisterResponseModel from '../models/register.response.model'
import BaseModel from '../../common/models/base.model'

async function generateToken(req: Request<unknown, unknown, unknown>, res: Response): Promise<Token> {
    const request = new ORequest(req)
    const response = new OResponse(res)

    return await oauth.token(request, response)
}

export async function token(req: Request, res: Response<OauthResponseModel | ErrorModel>): Promise<void> {
    try {
        const token = await generateToken(req, res)

        res.status(201).send(new OauthResponseModel(token.accessToken, token.accessTokenExpiresAt))
    } catch (err: unknown) {
        res.status(404).send(new ErrorModel(req.url, `Invalid login request : ${err.toString()}`))
    }
}

type RegisterRequest = Request<unknown, unknown, RegisterRequestModel>
export async function register(req: RegisterRequest, res: Response<BaseModel>): Promise<void> {
    try {
        await DatabaseService.createUser(req.body.mail, req.body.username, req.body.password)

        res.status(201).send(new RegisterResponseModel())
    } catch (err: unknown) {
        res.status(409).send(new ErrorModel(req.url, `Invalid register request : ${err.toString()}`))
    }
}
