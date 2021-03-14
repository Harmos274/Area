export default class GithubErrorModel extends Error {
    constructor(message: string) {
        super(`GitHub Service Error:${message}`)
    }
}
