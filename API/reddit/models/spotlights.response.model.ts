import BaseModel from '../../common/models/base.model'
import RedditSpotlightsModel from '../services/models/reddit.spotlights.model'

export default class SpotlightsResponseModel extends BaseModel {
    constructor(spotlights: Array<RedditSpotlightsModel>) {
        super(true)
        this.data = spotlights
    }
    data: Array<RedditSpotlightsModel>
}
