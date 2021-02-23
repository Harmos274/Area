import { NextFunction, Request, Response } from 'express'
import ErrorModel from '../../common/models/error.model'
import RegisterRequestModel from '../models/register.request.model'

type RegisterRequest = Request<unknown, unknown, RegisterRequestModel>

export default function hasRegisterValidFields(req: RegisterRequest, res: Response<ErrorModel>, next: NextFunction): Response<ErrorModel> {
    const errors: Array<string> = []

    if (req.body) {
        if (!req.body.mail) {
            errors.push('Missing name field')
        }
        if (!req.body.username) {
            errors.push('Missing surname field')
        }
        if (!req.body.password) {
            errors.push('Missing password field')
        }
        if (errors.length !== 0) {
            return res.status(400).send(new ErrorModel(req.url, errors.join(',')))
        } else {
            next()
        }
    } else {
        return res.status(400).send(new ErrorModel(req.url, 'Missing mail, username and password fields'))
    }
}
