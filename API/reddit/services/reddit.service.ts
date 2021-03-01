import RedditConfig from '../config/reddit.config'
import axios from 'axios'
import Config from '../../common/config/env.config'
import RedditTrendingModel from './models/reddit.trending.model'
import RedditAccessTokenResponse from './models/reddit.access_token.response'
import RedditErrorModel from './models/reddit.error.model'

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

    static async fromAccessCode(code: string): Promise<RedditService> {
        let res
        let service
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
            service = new RedditService(res.data.access_token)
        } catch (e) {
            throw new RedditErrorModel('Maybe Reddit API crew has implemented error code lol (no seriously its 2021 guys)')
        }

        // honestly i am crying rn
        if (JSON.stringify(res.data) === '{"error":"invalid_grant"}') {
            throw new RedditErrorModel('Invalid grant')
        }
        service.refresh_token = res.data.refresh_token
        return service
    }

    async profile(): Promise<void> {
        const headers = {
            Authorization: `Bearer ${this.access_token}`,
        }

        try {
            const res = await instance.post('https://oauth.reddit.com/api/v1/me', {}, { headers: headers })
            console.log(res.data)
        } catch (e) {
            console.log(e)
        }
        return
    }

    async spotlights(): Promise<void> {
        const headers = {
            Authorization: `Bearer ${this.access_token}`,
        }

        try {
            const trends = await instance.post<RedditTrendingModel>('https://reddit.com/api/trending_subreddits.json', {}, {})
            const trendsInfo = await Promise.all(
                trends.data.subreddit_names.map(async (sub) => await instance.post(`https://oauth.reddit.com/r/${sub}/about`, {}, { headers: headers }))
            )

            console.log(trendsInfo)
        } catch (e) {
            console.log(e)
        }
        return
    }

    async hots(subreddit: string, limit: number): Promise<void> {
        const headers = {
            Authorization: `Bearer ${this.access_token}`,
        }

        try {
            const res = await instance.post(`https://oauth.reddit.com/r/${subreddit}/hot?limit=${limit}`, {}, { headers: headers })
            console.log(res.data)
        } catch (e) {
            console.log(e)
        }
        return
    }
}
