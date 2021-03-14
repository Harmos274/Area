import { createOAuthAppAuth } from '@octokit/auth-oauth-app'
import { Octokit } from '@octokit/rest'
import GithubConfig from '../config/github.config'
import GithubErrorModel from './models/github.error.model'
import GithubProfileModel from './models/github.profile.model'
import GithubUserModel from './models/github.user.model'
import GithubRepositoryModel from './models/github.repository.model'
import GithubIssueModel, { GithubLabelModel } from './models/github.issue.model'

const auth = createOAuthAppAuth(GithubConfig)

export default class GithubService {
    constructor(token: string) {
        this.access_token = token
        this.service = new Octokit({ auth: this.access_token })
    }

    access_token: string
    service: Octokit

    static async fromAccessCode(accessCode: string): Promise<GithubService> {
        let access

        try {
            access = await auth({ type: 'token', code: accessCode })
        } catch (e: unknown) {
            throw new GithubErrorModel(e.toString())
        }
        if (access.type === 'token' && access?.tokenType === 'oauth') {
            return new GithubService(access.token)
        }
        throw new GithubErrorModel('Invalid grant type')
    }

    public async profile(): Promise<GithubProfileModel> {
        try {
            const user = await this.service.users.getAuthenticated()

            return new GithubProfileModel(
                user.data.name || user.data.login,
                user.data.avatar_url,
                user.data.html_url,
                user.data.company,
                user.data.location,
                user.data.bio,
                user.data.public_repos,
                user.data.total_private_repos,
                user.data.public_gists,
                user.data.private_gists,
                user.data.followers,
                user.data.following,
                new Date(user.data.updated_at)
            )
        } catch (e: unknown) {
            throw new GithubErrorModel(e.toString())
        }
    }

    public async issues(): Promise<Array<GithubIssueModel>> {
        try {
            const issues = await this.service.issues.listForAuthenticatedUser({ orgs: true })

            return issues.data.map(
                (issue) =>
                    new GithubIssueModel(
                        issue.html_url,
                        issue.number,
                        issue.state,
                        issue.title,
                        issue.body,
                        GithubUserModel.fromRawGithub(issue.user),
                        issue.labels.map((label) => {
                            if (typeof label === 'string') {
                                return new GithubLabelModel(label, null, null)
                            } else {
                                return new GithubLabelModel(label.name, label.description, label.color)
                            }
                        }),
                        issue.assignees.map((assignee) => GithubUserModel.fromRawGithub(assignee)),
                        issue.comments,
                        issue.pull_request?.html_url,
                        new Date(issue.created_at),
                        new Date(issue.updated_at),
                        new Date(issue.closed_at),
                        new GithubRepositoryModel(
                            issue.repository.name,
                            issue.repository.full_name,
                            issue.repository.description,
                            GithubUserModel.fromRawGithub(issue.repository.owner),
                            issue.repository.html_url,
                            new Date(issue.repository.created_at),
                            new Date(issue.repository.updated_at),
                            new Date(issue.repository.pushed_at),
                            issue.repository.stargazers_count,
                            issue.repository.watchers,
                            issue.repository.language,
                            null,
                            issue.repository.open_issues
                        )
                    )
            )
        } catch (e: unknown) {
            throw new GithubErrorModel(e.toString())
        }
    }

    public async spotlights(): Promise<Array<GithubRepositoryModel>> {
        try {
            const spotlights = await this.service.search.repos({ sort: 'updated', order: 'desc', per_page: 10, q: 'stars:>10000' })

            return spotlights.data.items.map((repo) => {
                return new GithubRepositoryModel(
                    repo.name,
                    repo.full_name,
                    repo.description,
                    new GithubUserModel(repo.owner.login, repo.owner.avatar_url, repo.owner.html_url, repo.owner.type, repo.owner.site_admin),
                    repo.html_url,
                    new Date(repo.created_at),
                    new Date(repo.updated_at),
                    new Date(repo.pushed_at),
                    repo.stargazers_count,
                    repo.watchers_count,
                    repo.language,
                    repo.score,
                    repo.open_issues
                )
            })
        } catch (e: unknown) {
            throw new GithubErrorModel(e.toString())
        }
    }
}
