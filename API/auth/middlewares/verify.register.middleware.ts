import {NextFunction, Request, Response} from 'express'
import ErrorModel from '../../common/models/error.model'

export default function hasRegisterValidFields(req: Request, res: Response<ErrorModel>, next: NextFunction): Response<ErrorModel> {
    const errors: Array<string> = []

    if (req.body) {
        if (!req.body.name) {
            errors.push('Missing name field');
        }
        if (!req.body.surname) {
            errors.push('Missing surname field');
        }
        if (!req.body.mail) {
            errors.push('Missing mail field');
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
        return res.status(400).send(new ErrorModel("Missing name, surname, mail and password fields"))
    }
}