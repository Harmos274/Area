import { Request, Response } from 'express'
import BaseModel from '../../common/models/base.model'
import { Token } from 'oauth2-server'
import User from '../../common/services/orm/models/users.database.model'
import SpotifyService from '../service/spotify.service'
import ProfileResponseModel from '../models/profile.response.model'
import PlayerResponseModel from '../models/player.response.model'
import ErrorModel from '../../common/models/error.model'

export async function profile(req: Request, res: Response<BaseModel, Record<string, Token>>): Promise<void> {
    try {
        const user = res.locals.oauth.user as User
        const service = new SpotifyService(user.spotify.token)

        res.status(200).send(new ProfileResponseModel(await service.profile()))
    } catch (e: unknown) {
        res.status(500).send(new ErrorModel(req.url, `Internal Error: ${e.toString()}`))
    }
}

export function music(req: Request, res: Response<BaseModel, Record<string, Token>>): void {
    try {
        const url = SpotifyService.getMusicPlayer(req.query.uri as string)

        res.status(200).send(new PlayerResponseModel(url))
    } catch (e: unknown) {
        res.status(400).send(new ErrorModel(req.url, e.toString()))
    }
}

export function podcast(req: Request, res: Response<BaseModel, Record<string, Token>>): void {
    try {
        const url = SpotifyService.getPodcastPlayer(req.query.uri as string)

        res.status(200).send(new PlayerResponseModel(url))
    } catch (e: unknown) {
        res.status(400).send(new ErrorModel(req.url, e.toString()))
    }
}
