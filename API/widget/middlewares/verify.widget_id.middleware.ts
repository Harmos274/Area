import { NextFunction, Request, Response } from 'express'
import ErrorModel from '../../common/models/error.model'

export default function hasWidgetIdValidField(req: Request, res: Response<ErrorModel>, next: NextFunction): Response<ErrorModel> {
    if (req.params.widget_id) {
        next()
    } else {
        return res.status(404).send(new ErrorModel(req.url, 'Invalid resource'))
    }
}
