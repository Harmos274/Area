export default class RedditErrorModel extends Error {
    constructor(message: string) {
        super(`Reddit Service Error:${message}`)
    }
}
