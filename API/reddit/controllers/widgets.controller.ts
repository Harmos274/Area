import { Request, Response } from 'express'
import BaseModel from '../../common/models/base.model'
import ErrorModel from '../../common/models/error.model'
import { Token } from 'oauth2-server'
import User from '../../common/services/orm/models/users.database.model'
import RedditService from '../services/reddit.service'
import ProfileResponseModel from '../models/profile.response.model'
import HotsResponseModel from '../models/hots.response.model'
import SpotlightsResponseModel from '../models/spotlights.response.model'

export async function profile(req: Request, res: Response<BaseModel, Record<string, Token>>): Promise<void> {
    try {
        const user = res.locals.oauth.user as User
        const service = new RedditService(user.reddit.token)
        const profile = await service.profile()

        res.status(200).send(new ProfileResponseModel(profile))
    } catch (e: unknown) {
        res.status(500).send(new ErrorModel(req.url, `Reddit: ${e.toString()}`))
    }
}

export async function hots(req: Request, res: Response<BaseModel, Record<string, Token>>): Promise<void> {
    try {
        const user = res.locals.oauth.user as User
        const subreddit = req.query.sub as string
        const limit = Number(req.query.nbr)
        const hots = await new RedditService(user.reddit.token).hots(subreddit, limit)

        res.status(200).send(new HotsResponseModel(hots))
    } catch (e: unknown) {
        res.status(500).send(new ErrorModel(req.url, `Reddit: ${e.toString()}`))
    }
}

export async function spotlights(req: Request, res: Response<BaseModel, Record<string, Token>>): Promise<void> {
    try {
        const user = res.locals.oauth.user as User
        const spotlights = await new RedditService(user.reddit.token).spotlights()

        res.status(200).send(new SpotlightsResponseModel(spotlights))
    } catch (e: unknown) {
        res.status(500).send(new ErrorModel(req.url, `Reddit: ${e.toString()}`))
    }
}
