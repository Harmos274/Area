export default class RedditSpotlightsModel {
    constructor(name: string, description: string, population: number, icon_url: string, banner_url: string) {
        this.name = name
        this.description = description
        this.population = population
        this.icon_url = icon_url
        this.banner_url = banner_url
    }
    name: string
    description: string
    population: number
    icon_url: string
    banner_url: string
}
