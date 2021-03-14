import GithubUserModel from './github.user.model'
import GithubRepositoryModel from './github.repository.model'

export class GithubLabelModel {
    constructor(name: string, description: string, color: string) {
        this.name = name
        this.description = description
        this.color = color
    }
    name: string
    description: string
    color: string
}

export default class GithubIssueModel {
    constructor(
        issue_url: string,
        number: number,
        state: string,
        title: string,
        body: string,
        user: GithubUserModel,
        labels: Array<GithubLabelModel>,
        assignees: Array<GithubUserModel>,
        comments: number,
        pull_request_url: string,
        created_at: Date,
        updated_at: Date,
        closed_at: Date,
        repository: GithubRepositoryModel
    ) {
        this.issue_url = issue_url
        this.number = number
        this.state = state
        this.title = title
        this.body = body
        this.user = user
        this.labels = labels
        this.assignees = assignees
        this.comments = comments
        this.pull_request_url = pull_request_url
        this.created_at = created_at
        this.updated_at = updated_at
        this.closed_at = closed_at
        this.repository = repository
    }

    issue_url: string
    number: number
    state: string
    title: string
    body: string
    user: GithubUserModel
    labels: Array<GithubLabelModel>
    assignees: Array<GithubUserModel>
    comments: number
    pull_request_url: string
    created_at: Date
    updated_at: Date
    closed_at: Date
    repository: GithubRepositoryModel
}
