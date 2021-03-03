import { Request, Response } from 'express'
import BaseModel from '../../common/models/base.model'
import ErrorModel from '../../common/models/error.model'
import RedditService from '../services/reddit.service'
import TokenLinkRequestModel from '../models/token.link.request.model'
import DatabaseService from '../../common/services/database/database.service'
import User from '../../common/services/orm/models/users.database.model'
import { Token } from 'oauth2-server'
import LinkResponseModel from '../models/link.response.model'
import StatusResponseModel from '../../common/models/status.response.model'

export async function link(req: Request<unknown, unknown, TokenLinkRequestModel>, res: Response<BaseModel, Record<string, Token>>): Promise<void> {
    try {
        const user = res.locals.oauth.user as User
        const service = await RedditService.fromAccessCode(req.body.access_code)

        await DatabaseService.saveServiceAccessToken('reddit', user, service.access_token, service.refresh_token, service.expire_date)
        res.status(200).send(new LinkResponseModel())
    } catch (e: unknown) {
        res.status(403).send(new ErrorModel(req.url, `Reddit : ${e.toString()}`))
    }
}

export async function unlink(req: Request, res: Response<BaseModel, Record<string, Token>>): Promise<void> {
    try {
        const user = res.locals.oauth.user as User

        await DatabaseService.disableService('reddit', user)
        res.status(200).send(new LinkResponseModel())
    } catch (e) {
        res.status(500).send(new ErrorModel(req.url, 'Database error'))
    }
}

export function status(req: Request, res: Response<BaseModel, Record<string, Token>>): void {
    const user = res.locals.oauth.user as User

    if (user.reddit && user.reddit.enabled) {
        res.status(200).send(new StatusResponseModel(true))
    } else {
        res.status(200).send(new StatusResponseModel(false))
    }
}
