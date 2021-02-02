import ErrorModel from '../../common/models/error.model'
import BaseModel from '../../common/models/base.model'
import AuthModel from '../../common/models/auth/auth.model'
import {Response, Request} from 'express'

function generateToken(): string {
    return "qwerty"
}

export function login(req: Request, res: Response<BaseModel>): void {
    try {
        res.status(201).send(new AuthModel(generateToken()))
    } catch (err) {
        res.status(500).send(new ErrorModel(`Invalid login request : ${err}`))
    }
}

export function register(req: Request, res: Response<BaseModel>): void {
    try {
        res.status(201).send(new AuthModel(generateToken()))
    } catch (err) {
        res.status(500).send(new ErrorModel(`Invalid register request : ${err}`))
    }
}