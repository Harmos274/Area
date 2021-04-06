import { NextFunction, Request, Response } from 'express'
import ErrorModel from '../models/error.model'
import TokenLinkRequestModel from '../models/token.link.request.model'

type LinkRequestModel = Request<unknown, unknown, TokenLinkRequestModel>

export default function hasLinkValidField(req: LinkRequestModel, res: Response<ErrorModel>, next: NextFunction): Response<ErrorModel> {
    if (req.body.code) {
        next()
    } else {
        return res.status(400).send(new ErrorModel(req.url, 'Missing access_code field'))
    }
}
