import { NextFunction, Request, Response } from 'express'
import { Token } from 'oauth2-server'
import User from '../../common/services/orm/models/users.database.model'
import ErrorModel from '../../common/models/error.model'
import RedditService from '../services/reddit.service'
import DatabaseService from '../../common/services/database/database.service'

export async function validRedditToken(req: Request, res: Response<ErrorModel, Record<string, Token>>, next: NextFunction): Promise<Response<ErrorModel>> {
    const user = res.locals.oauth.user as User

    try {
        if (user.reddit && user.reddit.enabled) {
            if (user.reddit.token_expire_date.getTime() <= new Date().getTime()) {
                const service = await RedditService.fromRefreshToken(user.reddit.refresh_token)
                await DatabaseService.saveServiceAccessToken('reddit', user, service.access_token, service.refresh_token, service.expire_date)
            }
            next()
        } else {
            return res.status(403).send(new ErrorModel(req.url, 'Reddit: Service not enabled'))
        }
    } catch (e: unknown) {
        return res.status(500).send(new ErrorModel(req.url, `Internal Error: ${e.toString()}`))
    }
}
