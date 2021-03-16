import { Request, Response } from 'express'
import BaseModel from '../../common/models/base.model'
import { Token } from 'oauth2-server'
import User from '../../common/services/orm/models/users.database.model'
import ErrorModel from '../../common/models/error.model'
import GithubService from '../services/github.service'
import ProfileResponseModel from '../models/profile.response.model'
import IssuesResponseModel from '../models/issues.response.model'
import SpotlightsResponseModel from '../models/spotlights.response.model'

export async function profile(req: Request, res: Response<BaseModel, Record<string, Token>>): Promise<void> {
    try {
        const user = res.locals.oauth.user as User
        const service = new GithubService(user.github.token)
        const profile = await service.profile()

        res.status(200).send(new ProfileResponseModel(profile))
    } catch (e: unknown) {
        res.status(500).send(new ErrorModel(req.url, `GitHub: ${e.toString()}`))
    }
}

export async function issues(req: Request, res: Response<BaseModel, Record<string, Token>>): Promise<void> {
    try {
        const user = res.locals.oauth.user as User
        const service = new GithubService(user.github.token)
        const issues = await service.issues()

        res.status(200).send(new IssuesResponseModel(issues))
    } catch (e: unknown) {
        res.status(500).send(new ErrorModel(req.url, `GitHub: ${e.toString()}`))
    }
}

export async function spotlights(req: Request, res: Response<BaseModel, Record<string, Token>>): Promise<void> {
    try {
        const user = res.locals.oauth.user as User
        const service = new GithubService(user.github.token)
        const spots = await service.spotlights()

        res.status(200).send(new SpotlightsResponseModel(spots))
    } catch (e: unknown) {
        res.status(500).send(new ErrorModel(req.url, `GitHub: ${e.toString()}`))
    }
}
