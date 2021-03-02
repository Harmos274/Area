import BaseModel from '../../common/models/base.model'
import RedditHotsModel from '../services/models/reddit.hots.model'

export default class HotsResponseModel extends BaseModel {
    constructor(hots: Array<RedditHotsModel>) {
        super(true)
        this.data = hots
    }
    data: Array<RedditHotsModel>
}
