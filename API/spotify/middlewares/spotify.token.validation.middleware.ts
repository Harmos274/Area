import { NextFunction, Request, Response } from 'express'
import { Token } from 'oauth2-server'
import User from '../../common/services/orm/models/users.database.model'
import ErrorModel from '../../common/models/error.model'
import DatabaseService from '../../common/services/database/database.service'
import SpotifyService from '../service/spotify.service'

export async function validSpotifyToken(req: Request, res: Response<ErrorModel, Record<string, Token>>, next: NextFunction): Promise<Response<ErrorModel>> {
    const user = res.locals.oauth.user as User

    try {
        if (user.spotify && user.spotify.enabled) {
            if (user.spotify.token_expire_date.getTime() <= new Date().getTime()) {
                const service = await SpotifyService.fromRefreshToken(user.spotify.refresh_token)
                await DatabaseService.saveServiceAccessToken('spotify', user, service.access_token, service.refresh_token, service.expire_date)
            }
            next()
        } else {
            return res.status(403).send(new ErrorModel(req.url, 'Spotify: Service not enabled'))
        }
    } catch (e: unknown) {
        return res.status(500).send(new ErrorModel(req.url, `Internal Error: ${e.toString()}`))
    }
}
