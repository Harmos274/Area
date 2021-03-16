import BaseModel from '../../common/models/base.model'
import GithubIssueModel from '../services/models/github.issue.model'

export default class IssuesResponseModel extends BaseModel {
    constructor(data: Array<GithubIssueModel>) {
        super(true)
        this.data = data
    }
    data: Array<GithubIssueModel>
}
