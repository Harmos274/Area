import BaseModel from '../../common/models/base.model'
import SpotifyProfileModel from '../service/models/spotify.profile.model'

export default class ProfileResponseModel extends BaseModel {
    constructor(data: SpotifyProfileModel) {
        super(true)
        this.data = data
    }
    data: SpotifyProfileModel
}
