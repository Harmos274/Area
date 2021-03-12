import { NextFunction, Request, Response } from 'express'
import CreateRequestModel from '../models/create.request.model'
import ErrorModel from '../../common/models/error.model'
import WidgetService from '../services/widget.service'

type CreateRequest = Request<unknown, unknown, CreateRequestModel>
export default async function validTypeName(req: CreateRequest, res: Response<ErrorModel>, next: NextFunction): Promise<Response<ErrorModel>> {
    if (await WidgetService.isValidTypeName(req.body.type_name)) {
        next()
    } else {
        return res.status(400).send(new ErrorModel(req.url, 'Invalid type_name'))
    }
}
