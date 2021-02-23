import { NextFunction, Response, Request } from 'express'
import ErrorModel from '../../common/models/error.model'
import RegisterRequestModel from '../models/register.request.model'

type RegisterRequest = Request<unknown, unknown, RegisterRequestModel>

export default function hasValidEmailFormatting(req: RegisterRequest, res: Response<ErrorModel>, next: NextFunction): Response<ErrorModel> {
    if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(req.body.mail)) {
        next()
    } else {
        return res.status(400).send(new ErrorModel(req.url, 'Invalid mail formatting'))
    }
}
