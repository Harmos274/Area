export default class OauthResponseModel {
    constructor(accessToken: string, accessTokenExpiresAt: Date) {
        this.accessToken = accessToken
        this.accessTokenExpiresAt = accessTokenExpiresAt
    }
    accessToken: string
    accessTokenExpiresAt: Date
}
