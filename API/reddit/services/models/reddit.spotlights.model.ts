export default class RedditSpotlightsModel {
    constructor(name: string, description: string, population: number, icon_url: string, banner_url: string, url: string) {
        this.name = name
        this.description = description
        this.population = population
        this.icon_url = icon_url
        this.banner_url = banner_url
        this.url = url
    }
    name: string
    description: string
    population: number
    icon_url: string
    banner_url: string
    url: string
}
