import GithubUserModel from './github.user.model'

export default class GithubRepositoryModel {
    constructor(
        name: string,
        full_name: string,
        description: string,
        owner: GithubUserModel,
        repo_url: string,
        created_at: Date,
        updated_at: Date,
        pushed_at: Date,
        stargazers_count: number,
        watchers_count: number,
        language: string,
        score: number,
        open_issues: number
    ) {
        this.name = name
        this.full_name = full_name
        this.description = description
        this.owner = owner
        this.repo_url = repo_url
        this.created_at = created_at
        this.updated_at = updated_at
        this.pushed_at = pushed_at
        this.stargazers_count = stargazers_count
        this.watchers_count = watchers_count
        this.language = language
        this.score = score
        this.open_issues = open_issues
    }

    name: string
    full_name: string
    description: string
    owner: GithubUserModel
    repo_url: string
    created_at: Date
    updated_at: Date
    pushed_at: Date
    stargazers_count: number
    watchers_count: number
    language: string
    score: number
    open_issues: number
}
