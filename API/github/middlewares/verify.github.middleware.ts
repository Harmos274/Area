import { NextFunction, Request, Response } from 'express'
import ErrorModel from '../../common/models/error.model'
import User from '../../common/services/orm/models/users.database.model'
import { Token } from 'oauth2-server'

export default function isGithubServiceEnabled(req: Request, res: Response<ErrorModel, Record<string, Token>>, next: NextFunction): Response<ErrorModel> {
    const user = res.locals.oauth.user as User

    if (user.github && user.github.enabled) {
        next()
    } else {
        return res.status(403).send(new ErrorModel(req.url, 'GitHub service disabled'))
    }
}
