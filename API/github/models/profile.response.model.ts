import BaseModel from '../../common/models/base.model'
import GithubProfileModel from '../services/models/github.profile.model'

export default class ProfileResponseModel extends BaseModel {
    constructor(profile: GithubProfileModel) {
        super(true)
        this.data = profile
    }

    data: GithubProfileModel
}
