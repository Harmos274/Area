import { Request, Response } from 'express'
import { Token } from 'oauth2-server'
import User from '../../common/services/orm/models/users.database.model'
import UnauthedAboutResponseModel from '../models/unauthed.about.response.model'
import BaseAboutResponseModel from '../models/base.about.response.model'
import AuthedAboutResponseModel from '../models/authed.about.response.model'
import AboutServices from '../services/about.services'

export function about(req: Request, res: Response<BaseAboutResponseModel, Record<string, Token>>): void {
    const user = res.locals.oauth?.user as User
    const hostUrl = `${req.protocol}://${req.get('host')}`
    if (user) {
        const service = new AboutServices(user)

        res.status(200).send(new AuthedAboutResponseModel(hostUrl, service.getServices()))
    } else {
        res.status(200).send(new UnauthedAboutResponseModel(hostUrl))
    }
}
