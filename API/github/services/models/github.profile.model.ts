export default class GithubProfileModel {
    constructor(
        name: string,
        avatar_url: string,
        account_url: string,
        company: string,
        location: string,
        bio: string,
        public_repos: number,
        private_repos: number,
        public_gists: number,
        private_gists: number,
        followers: number,
        following: number,
        updated_at: Date
    ) {
        this.name = name
        this.avatar_url = avatar_url
        this.account_url = account_url
        this.company = company
        this.location = location
        this.bio = bio
        this.public_repos = public_repos
        this.private_repos = private_repos
        this.public_gists = public_gists
        this.private_gists = private_gists
        this.followers = followers
        this.following = following
        this.updated_at = updated_at
    }

    name: string
    avatar_url: string
    account_url: string
    company: string
    location: string
    bio: string
    public_repos: number
    private_repos: number
    public_gists: number
    private_gists: number
    followers: number
    following: number
    updated_at: Date
}
