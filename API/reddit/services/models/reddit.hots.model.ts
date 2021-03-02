export default class RedditHotsModel {
    constructor(author: string, title: string, selftext: string, score: number, ratio: number, image: string, thumbnail: string, pinned: boolean) {
        this.author = author
        this.title = title
        this.selftext = selftext
        this.score = score
        this.ratio = ratio
        this.image = image
        this.thumbnail = thumbnail
        this.pinned = pinned
    }

    author: string
    title: string
    selftext: string
    score: number
    ratio: number
    image: string
    thumbnail: string
    pinned: boolean
}
