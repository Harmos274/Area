import { Request, Response } from 'express'
import BaseModel from '../../common/models/base.model'
import ErrorModel from '../../common/models/error.model'
import { Token } from 'oauth2-server'

export function profile(req: Request, res: Response<BaseModel, Record<string, Token>>): void {
    res.status(501).send(new ErrorModel(req.url, 'Not implemented'))
}

export function hots(req: Request, res: Response<BaseModel>): void {
    res.status(501).send(new ErrorModel(req.url, 'Not implemented'))
}

export function spotlights(req: Request, res: Response<BaseModel>): void {
    res.status(501).send(new ErrorModel(req.url, 'Not implemented'))
}
