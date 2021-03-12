import { NextFunction, Request, Response } from 'express'
import ErrorModel from '../../common/models/error.model'
import CreateRequestModel from '../models/create.request.model'

type CreateRequest = Request<unknown, unknown, CreateRequestModel>
export default function hasCreateWidgetValidField(req: CreateRequest, res: Response<ErrorModel>, next: NextFunction): Response<ErrorModel> {
    const errors: Array<string> = []

    if (req.body) {
        if (!req.body.type_name) {
            errors.push('Missing type_name field')
        }
        if (errors.length !== 0) {
            return res.status(400).send(new ErrorModel(req.url, errors.join(',')))
        }
        next()
    } else {
        return res.status(400).send(new ErrorModel(req.url, 'Missing body'))
    }
}
