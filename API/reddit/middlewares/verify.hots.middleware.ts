import { NextFunction, Request, Response } from 'express'
import ErrorModel from '../../common/models/error.model'

export default function hasHotsValidArguments(req: Request, res: Response<ErrorModel>, next: NextFunction): Response<ErrorModel> {
    const errors: Array<string> = []

    if (req.query) {
        if (!req.query.sub) {
            errors.push('Missing sub argument')
        }
        if (!req.query.nbr) {
            errors.push('Missing nbr argument')
        }
        if (errors.length !== 0) {
            return res.status(400).send(new ErrorModel(req.url, errors.join(',')))
        } else {
            next()
        }
    } else {
        return res.status(400).send(new ErrorModel(req.url, 'Missing sub and nbr arguments'))
    }
}
