import { NextFunction, Request, Response } from 'express'
import ErrorModel from '../../common/models/error.model'

export default function hasLoginValidFields(req: Request, res: Response<ErrorModel>, next: NextFunction): Response<ErrorModel> {
    const errors: Array<string> = []

    if (req.body) {
        if (!req.body.mail) {
            errors.push('Missing username field');
        }
        if (!req.body.password) {
            errors.push('Missing password field');
        }
        if (errors.length !== 0) {
            return res.status(400).send(new ErrorModel(errors.join(',')))
        } else {
            next()
        }
    } else {
        return res.status(400).send(new ErrorModel("Missing username and password fields"))
    }
}