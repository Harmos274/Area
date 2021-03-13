export default class SpotifyErrorModel extends Error {
    constructor(message: string) {
        super(`Spotify Service Error:${message}`)
    }
}
