import GithubRepositoryModel from '../services/models/github.repository.model'
import BaseModel from '../../common/models/base.model'

export default class SpotlightsResponseModel extends BaseModel {
    constructor(data: Array<GithubRepositoryModel>) {
        super(true)
        this.data = data
    }
    data: Array<GithubRepositoryModel>
}
