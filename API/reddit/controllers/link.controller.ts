import { Request, Response } from 'express'
import BaseModel from '../../common/models/base.model'
import ErrorModel from '../../common/models/error.model'
import RedditService from '../services/reddit.service'
import TokenLinkRequestModel from '../../common/models/token.link.request.model'
import DatabaseService from '../../common/services/database/database.service'
import User from '../../common/services/orm/models/users.database.model'
import { Token } from 'oauth2-server'
import LinkResponseModel from '../../common/models/link.response.model'

export async function link(req: Request<unknown, unknown, TokenLinkRequestModel>, res: Response<BaseModel, Record<string, Token>>): Promise<void> {
    try {
        const user = res.locals.oauth.user as User
        const service = await RedditService.fromAccessCode(req.body.code)

        await DatabaseService.saveServiceAccessToken('reddit', user, service.access_token, service.refresh_token, service.expire_date)
        res.status(200).send(new LinkResponseModel())
    } catch (e: unknown) {
        res.status(403).send(new ErrorModel(req.url, `Reddit : ${e.toString()}`))
    }
}
