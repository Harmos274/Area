import RedditConfig from '../config/reddit.config'
import axios from 'axios'
import Config from '../../common/config/env.config'
import RedditTrendingModel from './models/reddit.trending.model'
import RedditAccessTokenResponse from './models/reddit.access_token.response'
import RedditErrorModel from './models/reddit.error.model'
import RedditMeResponseModel from './models/reddit.me.response.model'
import RedditProfileModel from './models/reddit.profile.model'
import RedditHotChildrenResponseModel from './models/reddit.hot.response.model'
import RedditHotsModel from './models/reddit.hots.model'
import RedditAboutResponseModel from './models/reddit.about.response.model'
import RedditSpotlightsModel from './models/reddit.spotlights.model'

const instance = axios.create({
    headers: {
        'User-Agent': `node:area:v${Config.version} (by /u/agarof)`,
    },
})

export default class RedditService {
    constructor(token: string) {
        this.access_token = token
    }

    access_token: string
    refresh_token: string
    expire_date: Date

    static async fromAccessCode(code: string): Promise<RedditService> {
        let res
        const today = new Date()
        const headers = {
            'Content-Type': 'application/x-www-form-urlencoded',
            Authorization: `Basic ${Buffer.from(`${RedditConfig.client_id}:${RedditConfig.client_secret}`).toString('base64')}`,
        }
        const body = new URLSearchParams()
        body.append('grant_type', 'authorization_code')
        body.append('code', code)
        body.append('redirect_uri', 'http://localhost:8080/callbacks/reddit')

        try {
            res = await instance.post<RedditAccessTokenResponse>('https://www.reddit.com/api/v1/access_token', body, { headers: headers })
        } catch (e) {
            throw new RedditErrorModel('Maybe Reddit API crew has implemented error code lol (no seriously its 2021 guys)')
        }

        // honestly i am crying rn
        if (JSON.stringify(res.data) === '{"error":"invalid_grant"}') {
            throw new RedditErrorModel('Invalid grant')
        }
        const service = new RedditService(res.data.access_token)
        service.refresh_token = res.data.refresh_token
        service.expire_date = new Date(today.getTime() + 1000 * res.data.expires_in) // request time + reddit token lifetime
        return service
    }

    static async fromRefreshToken(refreshToken: string): Promise<RedditService> {
        const today = new Date()
        const headers = {
            'Content-Type': 'application/x-www-form-urlencoded',
            Authorization: `Basic ${Buffer.from(`${RedditConfig.client_id}:${RedditConfig.client_secret}`).toString('base64')}`,
        }
        const body = new URLSearchParams()
        body.append('grant_type', 'refresh_token')
        body.append('refresh_token', refreshToken)

        try {
            const res = await instance.post<RedditAccessTokenResponse>('https://www.reddit.com/api/v1/access_token', body, { headers: headers })
            const service = new RedditService(res.data.access_token)

            service.refresh_token = res.data.refresh_token
            service.expire_date = new Date(today.getTime() + 1000 * res.data.expires_in) // request time + reddit token lifetime
            return service
        } catch (e: unknown) {
            throw new RedditErrorModel(`Unauthorised: ${e.toString()}`)
        }
    }

    async profile(): Promise<RedditProfileModel> {
        const headers = {
            Authorization: `Bearer ${this.access_token}`,
        }

        try {
            const res = await instance.get<RedditMeResponseModel>('https://oauth.reddit.com/api/v1/me', { headers: headers })

            return new RedditProfileModel(
                res.data.name,
                res.data.icon_img,
                res.data.awarder_karma,
                res.data.awardee_karma,
                res.data.link_karma,
                res.data.comment_karma
            )
        } catch (e: unknown) {
            throw new RedditErrorModel(`Unauthorized: ${e.toString()}`)
        }
    }

    async spotlights(): Promise<Array<RedditSpotlightsModel>> {
        const headers = {
            Authorization: `Bearer ${this.access_token}`,
        }

        try {
            const trends = await instance.get<RedditTrendingModel>('https://reddit.com/api/trending_subreddits.json', {})
            const trendsInfo = await Promise.all(
                trends.data.subreddit_names.map(async (sub) => {
                    const about = await instance.get<RedditAboutResponseModel>(`https://oauth.reddit.com/r/${sub}/about`, { headers: headers })
                    return about.data
                })
            )

            return trendsInfo.map(
                (trendies) =>
                    new RedditSpotlightsModel(
                        trendies.data.title,
                        trendies.data.description,
                        trendies.data.active_user_count,
                        trendies.data.icon_img ? trendies.data.icon_img : trendies.data.community_icon.split('?')[0],
                        trendies.data.banner_img
                    )
            )
        } catch (e: unknown) {
            throw new RedditErrorModel(`Error: ${e.toString()}`)
        }
    }

    async hots(subreddit: string, limit: number): Promise<Array<RedditHotsModel>> {
        const headers = {
            Authorization: `Bearer ${this.access_token}`,
        }

        try {
            const res = await instance.get<RedditHotChildrenResponseModel>(`https://oauth.reddit.com/r/${subreddit}/hot?limit=${limit}`, { headers: headers })

            return res.data.data.children.map(
                (child) =>
                    new RedditHotsModel(
                        child.data.author,
                        child.data.title,
                        child.data.selftext,
                        child.data.score,
                        child.data.upvote_ratio,
                        child.data.preview?.images[0].source.url,
                        child.data.thumbnail,
                        child.data.stickied
                    )
            )
        } catch (e: unknown) {
            throw new RedditErrorModel(`Unauthorized: ${e.toString()}`)
        }
    }
}
