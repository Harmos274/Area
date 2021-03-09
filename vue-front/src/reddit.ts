import { baseSelfUrl } from '@/definitions'
import { unlinkReddit } from '@/api'
import ProfileConfig from '@/components/widgets/reddit/ProfileConfig.vue'
import HotsConfig from '@/components/widgets/reddit/HotsConfig.vue'
import { ServiceDescription } from '@/service'
import SpotlightsConfig from '@/components/widgets/reddit/SpotlightsConfig.vue'

const client = {
  id: 'sKKnWraYCh8LoQ',
  redirect: `${baseSelfUrl}/callbacks/reddit`,
  authUrlBase: 'https://www.reddit.com/api/v1/authorize',
  scopes: ['identity', 'read'],
  // scopes: ['identity', 'read', 'account', 'creddits', 'edit', 'flair', 'history', 'identity', 'livemanage', 'modconfig', 'modcontributors', 'modflair', 'modlog', 'modmail', 'modothers', 'modposts', 'modself', 'modwiki', 'mysubreddits', 'privatemessages', 'read', 'report', 'save', 'structuredstyles', 'submit', 'subscribe', 'vote', 'wikiedit', 'wikiread'],
}

export function getUrl (): URL {
  const authUrl = new URL(client.authUrlBase)

  authUrl.searchParams.append('client_id', client.id)
  authUrl.searchParams.append('response_type', 'code')
  authUrl.searchParams.append('state', 'croacroa')
  authUrl.searchParams.append('redirect_uri', client.redirect)
  authUrl.searchParams.append('duration', 'permanent')
  authUrl.searchParams.append('scope', client.scopes.join(' '))

  return authUrl
}

export const RedditService: ServiceDescription = {
  headerSrcLight: require('@/assets/Reddit_Lockup_OnWhite.png'),
  headerSrcDark: require('@/assets/Reddit_Lockup_OnDark.png'),
  brandColor: '#FF4500',
  authUrlMethod: getUrl,
  unLink: unlinkReddit,
  widgets: [
    { description: 'Profile', creationDialog: ProfileConfig },
    { description: 'Subreddit', creationDialog: HotsConfig },
    { description: 'Spotlights', creationDialog: SpotlightsConfig },
  ],
}

export interface RedditAccountInfo {
  name: string;
  icon_url: string;
  awarder_karma: number;
  awardee_karma: number;
  link_karma: number;
  comment_karma: number;
}

export interface PostData {
  author: string;
  title: string;
  selftext: string;
  score: number;
  ratio: number;
  image: string;
  thumbnail: string;
  pinned: boolean;
}

export function emptyPostData (): PostData {
  return {
    author: '',
    title: '',
    selftext: '',
    score: 0,
    ratio: 0,
    image: '',
    thumbnail: '',
    pinned: false,
  }
}

export interface Spotlight {
  name: string;
  description: string;
  population: number;
  icon_url: string;
  banner_url: string;
}

export function emptySpotliht (): Spotlight {
  return {
    name: '',
    description: '',
    population: 0,
    icon_url: '',
    banner_url: '',
  }
}

export interface RedditState {
  accountInfo?: RedditAccountInfo;
  subredditsHots: Map<string, PostData[]>;
  spotlights: Spotlight[];
}
