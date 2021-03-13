import DatabaseService, { ServiceType } from '../services/database/database.service'
import { Request, Response } from 'express'
import BaseModel from '../models/base.model'
import { Token } from 'oauth2-server'
import User from '../services/orm/models/users.database.model'
import StatusResponseModel from '../models/status.response.model'
import LinkResponseModel from '../models/link.response.model'
import ErrorModel from '../models/error.model'

// Should be used after token.validation.middleware (VERY unsafe)
export function statusOf(service: ServiceType): (req: Request, res: Response<BaseModel, Record<string, Token>>) => void {
    return function (req, res): void {
        const user = res.locals.oauth.user as User

        if (user[service] && user[service].enabled) {
            res.status(200).send(new StatusResponseModel(true))
        } else {
            res.status(200).send(new StatusResponseModel(false))
        }
    }
}

// Should be used after token.validation.middleware (VERY unsafe)
export function unlinkOf(service: ServiceType): (req: Request, res: Response<BaseModel, Record<string, Token>>) => Promise<void> {
    return async function (req: Request, res: Response<BaseModel, Record<string, Token>>): Promise<void> {
        try {
            const user = res.locals.oauth.user as User

            await DatabaseService.disableService(service, user)
            res.status(200).send(new LinkResponseModel())
        } catch (e) {
            res.status(500).send(new ErrorModel(req.url, 'Database error'))
        }
    }
}
