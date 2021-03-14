import { components } from '@octokit/openapi-types'

export default class GithubUserModel {
    constructor(login: string, avatar_url: string, html_url: string, type: string, site_admin: boolean) {
        this.login = login
        this.avatar_url = avatar_url
        this.account_url = html_url
        this.type = type
        this.site_admin = site_admin
    }

    static fromRawGithub(model: components['schemas']['simple-user']): GithubUserModel {
        return new GithubUserModel(model.login, model.avatar_url, model.html_url, model.type, model.site_admin)
    }

    login: string
    avatar_url: string
    account_url: string
    type: string
    site_admin: boolean
}
