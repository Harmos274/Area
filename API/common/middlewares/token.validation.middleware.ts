import { NextFunction, Request, Response } from 'express'
import ErrorModel from '../../common/models/error.model'

export default function validBearerToken(req: Request, res: Response<ErrorModel>, next: NextFunction): Response<ErrorModel> | void {
    if (req.headers['authorization']) {
        try {
            const authorization = req.headers['authorization'].toString().split(' ')

            if (authorization[0] !== 'Bearer') {
                return res.status(401).send(new ErrorModel("Invalid authorization type"))
            } else {
                // code for bearer token validation here :)
                // do not implement in Forward (no time lmao)
                return next();
            }
        } catch (err) {
            return res.status(403).send(new ErrorModel(`Invalid authorization : ${err}`))
        }
    } else {
        return res.status(401).send(new ErrorModel("No authorization given"))
    }
}