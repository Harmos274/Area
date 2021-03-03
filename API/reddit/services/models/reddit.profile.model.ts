export default class RedditProfileModel {
    constructor(name: string, icon_url: string, awarder_karma: number, awardee_karma: number, link_karma: number, comment_karma: number) {
        this.name = name
        this.icon_url = icon_url
        this.awarder_karma = awarder_karma
        this.awardee_karma = awardee_karma
        this.link_karma = link_karma
        this.comment_karma = comment_karma
    }
    name: string
    icon_url: string
    awarder_karma: number
    awardee_karma: number
    link_karma: number
    comment_karma: number
}
