import { baseSelfUrl } from '@/definitions'
import { unlinkReddit } from '@/api'
import ProfileConfig from '@/components/widgets/reddit/ProfileConfig.vue'

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

export const RedditService = {
  headerSrcLight: require('@/assets/Reddit_Lockup_OnWhite.png'),
  headerSrcDark: require('@/assets/Reddit_Lockup_OnDark.png'),
  brandColor: '#FF4500',
  authUrlMethod: getUrl,
  unLink: unlinkReddit,
  widgets: [{ description: 'Profile', creationDialog: ProfileConfig }],
}

export interface RedditAccountInfo {
  name: string;
  icon_url: string;
  awarder_karma: number;
  awardee_karma: number;
  link_karma: number;
  comment_karma: number;
}

export interface RedditState {
  accountInfo?: RedditAccountInfo;
}
