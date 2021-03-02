import RedditProfileModel from '../services/models/reddit.profile.model'
import BaseModel from '../../common/models/base.model'

export default class ProfileResponseModel extends BaseModel {
    constructor(profile: RedditProfileModel) {
        super(true)
        this.data = profile
    }
    data: RedditProfileModel
}
