import { NextFunction, Request, Response } from 'express'
import ErrorModel from '../../common/models/error.model'

export default function hasPlayerValidArguments(req: Request, res: Response<ErrorModel>, next: NextFunction): Response<ErrorModel> {
    if (req.query && req.query.uri) {
        next()
    } else {
        return res.status(400).send(new ErrorModel(req.url, 'Missing uri argument'))
    }
}
