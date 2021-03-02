export default class RedditHotChildrenResponseModel {
    kind: string
    data: RedditHotsChildrenResponseModelData
}

interface RedditHotsChildrenResponseModelData {
    modhash: null
    dist: number
    children: Child[]
    after: string
    before: null
}

interface Child {
    kind: Kind
    data: ChildData
}

interface ChildData {
    approved_at_utc: null
    subreddit: Subreddit
    selftext: string
    author_fullname: string
    saved: boolean
    mod_reason_title: null
    gilded: number
    clicked: boolean
    title: string
    link_flair_richtext: FlairRichtext[]
    subreddit_name_prefixed: SubredditNamePrefixed
    hidden: boolean
    pwls: number
    link_flair_css_class: null | string
    downs: number
    thumbnail_height: number | null
    top_awarded_type: null
    hide_score: boolean
    name: string
    quarantine: boolean
    link_flair_text_color: FlairTextColor
    upvote_ratio: number
    author_flair_background_color: AuthorFlairBackgroundColor | null
    subreddit_type: SubredditType
    ups: number
    total_awards_received: number
    media_embed: DataMediaEmbed
    thumbnail_width: number | null
    author_flair_template_id: null | string
    is_original_content: boolean
    user_reports: unknown[]
    secure_media: DataMedia | null
    is_reddit_media_domain: boolean
    is_meta: boolean
    category: null
    secure_media_embed: DataMediaEmbed
    link_flair_text: null | string
    can_mod_post: boolean
    score: number
    approved_by: null
    author_premium: boolean
    thumbnail: string
    edited: boolean | number
    author_flair_css_class: null | string
    author_flair_richtext: AuthorFlairRichtext[]
    gildings: DataGildings
    content_categories: null
    is_self: boolean
    mod_note: null
    created: number
    link_flair_type: FlairType
    wls: number
    removed_by_category: null
    banned_by: null
    author_flair_type: FlairType
    domain: string
    allow_live_comments: boolean
    selftext_html: null | string
    likes: null
    suggested_sort: null | string
    banned_at_utc: null
    view_count: null
    archived: boolean
    no_follow: boolean
    is_crosspostable: boolean
    pinned: boolean
    over_18: boolean
    all_awardings: AllAwarding[]
    awarders: unknown[]
    media_only: boolean
    link_flair_template_id?: string
    can_gild: boolean
    spoiler: boolean
    locked: boolean
    author_flair_text: null | string
    treatment_tags: unknown[]
    visited: boolean
    removed_by: null
    num_reports: null
    distinguished: null
    subreddit_id: SubredditID
    mod_reason_by: null
    removal_reason: null
    link_flair_background_color: string
    id: string
    is_robot_indexable: boolean
    report_reasons: null
    author: string
    discussion_type: null
    num_comments: number
    send_replies: boolean
    whitelist_status: WhitelistStatus
    contest_mode: boolean
    mod_reports: unknown[]
    author_patreon_flair: boolean
    author_flair_text_color: FlairTextColor | null
    permalink: string
    parent_whitelist_status: WhitelistStatus
    stickied: boolean
    url: string
    subreddit_subscribers: number
    created_utc: number
    num_crossposts: number
    media: DataMedia | null
    is_video: boolean
    post_hint?: PostHint
    url_overridden_by_dest?: string
    preview?: Preview
    crosspost_parent_list?: CrosspostParentList[]
    crosspost_parent?: string
}

interface AllAwarding {
    giver_coin_reward: number | null
    subreddit_id: null
    is_new: boolean
    days_of_drip_extension: number
    coin_price: number
    id: string
    penny_donate: number | null
    award_sub_type: AwardSubType
    coin_reward: number
    icon_url: string
    days_of_premium: number
    tiers_by_required_awardings: null
    resized_icons: ResizedIcon[]
    icon_width: number
    static_icon_width: number
    start_date: null
    is_enabled: boolean
    awardings_required_to_grant_benefits: null
    description: string
    end_date: null
    subreddit_coin_reward: number
    count: number
    static_icon_height: number
    name: string
    resized_static_icons: ResizedIcon[]
    icon_format: IconFormat | null
    icon_height: number
    penny_price: number | null
    award_type: AwardType
    static_icon_url: string
}

enum AwardSubType {
    Global = 'GLOBAL',
    Premium = 'PREMIUM',
}

enum AwardType {
    Global = 'global',
}

enum IconFormat {
    Apng = 'APNG',
    PNG = 'PNG',
}

interface ResizedIcon {
    url: string
    width: number
    height: number
}

enum AuthorFlairBackgroundColor {
    Empty = '',
    Transparent = 'transparent',
}

interface AuthorFlairRichtext {
    e: E
    t?: string
    a?: string
    u?: string
}

enum E {
    Emoji = 'emoji',
    Text = 'text',
}

enum FlairTextColor {
    Dark = 'dark',
    Light = 'light',
}

enum FlairType {
    Richtext = 'richtext',
    Text = 'text',
}

interface CrosspostParentList {
    approved_at_utc: null
    subreddit: string
    selftext: string
    author_fullname: string
    saved: boolean
    mod_reason_title: null
    gilded: number
    clicked: boolean
    title: string
    link_flair_richtext: FlairRichtext[]
    subreddit_name_prefixed: string
    hidden: boolean
    pwls: number
    link_flair_css_class: string
    downs: number
    thumbnail_height: number
    top_awarded_type: null
    hide_score: boolean
    name: string
    quarantine: boolean
    link_flair_text_color: FlairTextColor
    upvote_ratio: number
    author_flair_background_color: AuthorFlairBackgroundColor | null
    subreddit_type: SubredditType
    ups: number
    total_awards_received: number
    media_embed: CrosspostParentListMediaEmbed
    thumbnail_width: number
    author_flair_template_id: null | string
    is_original_content: boolean
    user_reports: unknown[]
    secure_media: CrosspostParentListMedia | null
    is_reddit_media_domain: boolean
    is_meta: boolean
    category: null
    secure_media_embed: CrosspostParentListMediaEmbed
    link_flair_text: string
    can_mod_post: boolean
    score: number
    approved_by: null
    author_premium: boolean
    thumbnail: string
    edited: boolean
    author_flair_css_class: null | string
    author_flair_richtext: FlairRichtext[]
    gildings: CrosspostParentListGildings
    post_hint?: string
    content_categories: null
    is_self: boolean
    mod_note: null
    created: number
    link_flair_type: FlairType
    wls: number
    removed_by_category: null | string
    banned_by: null
    author_flair_type: FlairType
    domain: string
    allow_live_comments: boolean
    selftext_html: null
    likes: null
    suggested_sort: null
    banned_at_utc: null
    url_overridden_by_dest: string
    view_count: null
    archived: boolean
    no_follow: boolean
    is_crosspostable: boolean
    pinned: boolean
    over_18: boolean
    preview?: Preview
    all_awardings: AllAwarding[]
    awarders: unknown[]
    media_only: boolean
    link_flair_template_id?: string
    can_gild: boolean
    spoiler: boolean
    locked: boolean
    author_flair_text: null | string
    treatment_tags: unknown[]
    visited: boolean
    removed_by: null
    num_reports: null
    distinguished: null
    subreddit_id: string
    mod_reason_by: null
    removal_reason: null
    link_flair_background_color: string
    id: string
    is_robot_indexable: boolean
    report_reasons: null
    author: string
    discussion_type: null
    num_comments: number
    send_replies: boolean
    whitelist_status: string
    contest_mode: boolean
    mod_reports: unknown[]
    author_patreon_flair: boolean
    author_flair_text_color: FlairTextColor | null
    permalink: string
    parent_whitelist_status: string
    stickied: boolean
    url: string
    subreddit_subscribers: number
    created_utc: number
    num_crossposts: number
    media: CrosspostParentListMedia | null
    is_video: boolean
}

interface FlairRichtext {
    e: E
    t: string
}

interface CrosspostParentListGildings {
    gid_1: number
    gid_2?: number
}

interface CrosspostParentListMedia {
    reddit_video: RedditVideo
}

interface RedditVideo {
    bitrate_kbps: number
    fallback_url: string
    height: number
    width: number
    scrubber_media_url: string
    dash_url: string
    duration: number
    hls_url: string
    is_gif: boolean
    transcoding_status: string
}

interface CrosspostParentListMediaEmbed {
    [key: string]: unknown
}

interface Preview {
    images: Image[]
    enabled: boolean
}

interface Image {
    source: ResizedIcon
    resolutions: ResizedIcon[]
    variants: Variants
    id: string
}

interface Variants {
    obfuscated?: Nsfw
    nsfw?: Nsfw
}

interface Nsfw {
    source: ResizedIcon
    resolutions: ResizedIcon[]
}

enum SubredditType {
    Public = 'public',
}

interface DataGildings {
    gid_1?: number
}

interface DataMedia {
    type: MediaType
    oembed: Oembed
}

interface Oembed {
    provider_url: string
    version: string
    url?: string
    author_name: string
    height: number | null
    width: number
    html: string
    author_url: string
    provider_name: ProviderName
    cache_age?: number
    type: OembedType
    title?: string
    thumbnail_width?: number
    thumbnail_url?: string
    thumbnail_height?: number
}

enum ProviderName {
    Twitter = 'Twitter',
    YouTube = 'YouTube',
}

enum OembedType {
    Rich = 'rich',
    Video = 'video',
}

enum MediaType {
    TwitterCOM = 'twitter.com',
    YoutubeCOM = 'youtube.com',
}

interface DataMediaEmbed {
    content?: string
    width?: number
    scrolling?: boolean
    height?: number
    media_domain_url?: string
}

enum WhitelistStatus {
    AllAds = 'all_ads',
    PromoAdultNsfw = 'promo_adult_nsfw',
}

enum PostHint {
    Image = 'image',
    Link = 'link',
    RichVideo = 'rich:video',
}

enum Subreddit {
    France = 'france',
}

enum SubredditID {
    T52Qhjz = 't5_2qhjz',
}

enum SubredditNamePrefixed {
    RFrance = 'r/france',
}

enum Kind {
    T3 = 't3',
}
