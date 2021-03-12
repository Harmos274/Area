import { NextFunction, Request, Response } from 'express'
import ErrorModel from '../../common/models/error.model'
import { Token } from 'oauth2-server'
import User from '../../common/services/orm/models/users.database.model'
import Widget from '../../common/services/orm/models/widgets.database.model'

export default function validWidgetId(req: Request, res: Response<ErrorModel, Record<string, Token | Widget>>, next: NextFunction): Response<ErrorModel> {
    const user = res.locals.oauth.user as User

    try {
        res.locals.widget = user.widgets?.find((widget) => widget.id === Number(req.params.widget_id))

        if (!res.locals.widget) {
            return res.status(404).send(new ErrorModel(req.url, 'Invalid resource'))
        }
        next()
    } catch {
        return res.status(404).send(new ErrorModel(req.url, 'Invalid resource'))
    }
}
