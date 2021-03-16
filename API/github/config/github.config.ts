export default class GithubConfig {
    static clientId = process.env.GITHUB_CLIENT_ID
    static clientSecret = process.env.GITHUB_CLIENT_SECRET
    static redirectUri = process.env.GITHUB_REDIRECT_URI
    static state = process.env.GITHUB_STATE
}
