import { NextFunction, Request, Response } from 'express'
import ErrorModel from '../../common/models/error.model'
import TokenRequestModel from '../models/token.request.model'

type LoginRequest = Request<unknown, unknown, TokenRequestModel>

export default function hasTokenValidFields(req: LoginRequest, res: Response<ErrorModel>, next: NextFunction): Response<ErrorModel> {
    const errors: Array<string> = []

    if (req.body) {
        if (!req.body.username) {
            errors.push('Missing username field')
        }
        if (!req.body.password) {
            errors.push('Missing password field')
        }
        if (!req.body.grant_type) {
            errors.push('Missing grant_type field')
        }
        if (errors.length !== 0) {
            return res.status(400).send(new ErrorModel(req.url, errors.join(',')))
        } else {
            next()
        }
    } else {
        return res.status(400).send(new ErrorModel(req.url, 'Missing mail and password fields'))
    }
}
