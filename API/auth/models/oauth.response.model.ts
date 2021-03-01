import BaseModel from '../../common/models/base.model'

export default class OauthResponseModel extends BaseModel {
    constructor(accessToken: string, accessTokenExpiresAt: Date) {
        super(true)
        this.data = { access_token: accessToken, access_token_expires_at: accessTokenExpiresAt }
    }
    data: {
        access_token: string
        access_token_expires_at: Date
    }
}
