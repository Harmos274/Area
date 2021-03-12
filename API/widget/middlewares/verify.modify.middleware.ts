import { NextFunction, Request, Response } from 'express'
import ModifyRequestModel from '../models/modify.request.model'
import ErrorModel from '../../common/models/error.model'

type ModifyRequest = Request<unknown, unknown, ModifyRequestModel>
export default function hasValidModifyField(req: ModifyRequest, res: Response<ErrorModel>, next: NextFunction): Response<ErrorModel> {
    if (req.body.config) {
        next()
    } else {
        return res.status(400).send(new ErrorModel(req.url, 'No config provided'))
    }
}
