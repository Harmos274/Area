export default class SpotifyProfileModel {
    constructor(name: string, country: string, followers: number, image_url: string, premium: boolean) {
        this.country = country
        this.name = name
        this.followers = followers
        this.image_url = image_url
        this.premium = premium
    }

    country: string
    name: string
    followers: number
    image_url: string
    premium: boolean
}
