import { NextFunction, Request, Response } from 'express'
import { Token } from 'oauth2-server'
import User from '../../common/services/orm/models/users.database.model'
import ErrorModel from '../../common/models/error.model'

export function validRedditToken(req: Request, res: Response<ErrorModel, Record<string, Token>>, next: NextFunction): Response<ErrorModel> {
    const user = res.locals.oauth.user as User

    if (user.reddit && user.reddit.enabled) {
        next()
    } else {
        return res.status(403).send(new ErrorModel(req.url, 'Reddit : Service not enabled'))
    }
}
