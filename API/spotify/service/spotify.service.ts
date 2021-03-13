import SpotifyWebApi = require('spotify-web-api-node')
import SpotifyConfig from '../config/spotify.config'
import SpotifyProfileModel from './models/spotify.profile.model'
import SpotifyErrorModel from './models/spotify.error.model'

const SpotifyAPi = new SpotifyWebApi(SpotifyConfig)

export default class SpotifyService {
    constructor(token: string) {
        this.access_token = token
    }

    access_token: string
    refresh_token: string
    expire_date: Date

    static async fromAccessCode(accessCode: string): Promise<SpotifyService> {
        try {
            const today = new Date()
            const access = await SpotifyAPi.authorizationCodeGrant(accessCode)
            const service = new SpotifyService(access.body.access_token)

            service.expire_date = new Date(today.getTime() + 1000 * access.body.expires_in) // request time + spotify token lifetime
            service.refresh_token = access.body.refresh_token
            return service
        } catch (e: unknown) {
            throw new SpotifyErrorModel(e.toString())
        }
    }

    static async fromRefreshToken(refresh_token: string): Promise<SpotifyService> {
        try {
            const today = new Date()
            SpotifyAPi.setRefreshToken(refresh_token)
            const access = await SpotifyAPi.refreshAccessToken()
            const service = new SpotifyService(access.body.access_token)

            service.expire_date = new Date(today.getTime() + 1000 * access.body.expires_in) // request time + spotify token lifetime
            service.refresh_token = refresh_token
            return service
        } catch (e: unknown) {
            throw new SpotifyErrorModel(e.toString())
        }
    }

    public async profile(): Promise<SpotifyProfileModel> {
        try {
            SpotifyAPi.setAccessToken(this.access_token)
            const profile = await SpotifyAPi.getMe()
            const image = profile.body.images.length > 0 ? profile.body.images[0].url : undefined

            return new SpotifyProfileModel(
                profile.body.display_name,
                profile.body.country,
                profile.body.followers.total,
                image,
                profile.body.product === 'premium'
            )
        } catch (e: unknown) {
            throw new SpotifyErrorModel(e.toString())
        }
    }

    private static uriToUrl(resourceType: string, id: string): string {
        return `https://open.spotify.com/embed/${resourceType}/${id}`
    }

    static getMusicPlayer(uri: string): string {
        const [source, resource_type, id] = uri.split(':')
        const authorizedType = ['album', 'track', 'artist', 'playlist']

        if (source === 'spotify' && resource_type && id && authorizedType.find((t) => t === resource_type)) {
            return SpotifyService.uriToUrl(resource_type, id)
        }
        throw new SpotifyErrorModel('Invalid uri')
    }

    static getPodcastPlayer(uri: string): string {
        const [source, resource_type, id] = uri.split(':')

        if (source === 'spotify' && resource_type && id && resource_type === 'show') {
            return SpotifyService.uriToUrl(resource_type, id)
        }
        throw new SpotifyErrorModel('Invalid uri')
    }
}
