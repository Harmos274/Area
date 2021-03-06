import { baseSelfUrl, stateString } from '@/definitions'
import { unlinkService } from '@/api'
import { ServiceDescription } from '@/service'
import ProfileConfig from '@/components/widgets/spotify/ProfileConfig.vue'
import PlayerConfig from '@/components/widgets/spotify/PlayerConfig.vue'
import ShowPlayerConfig from '@/components/widgets/spotify/ShowPlayerConfig.vue'

const client = {
  id: process.env.VUE_APP_SPOTIFY_CLIENT_ID || '028e47fb0da04eae8cb2ab3b3d7da1b9',
  redirect: `${baseSelfUrl}/callbacks/spotify`,
  authUrlBase: 'https://accounts.spotify.com/authorize',
  scopes: ['user-read-email', 'user-read-private'],
}

export function getUrl (): URL {
  const authUrl = new URL(client.authUrlBase)

  authUrl.searchParams.append('client_id', client.id)
  authUrl.searchParams.append('response_type', 'code')
  authUrl.searchParams.append('state', stateString)
  authUrl.searchParams.append('redirect_uri', client.redirect)
  authUrl.searchParams.append('scope', client.scopes.join(' '))

  return authUrl
}

export const SpotifyService: ServiceDescription = {
  headerImageLight: require('@/assets/Spotify_Logo_Green.png'),
  headerImageDark: require('@/assets/Spotify_Logo_Green.png'),
  brandColor: '#1DB954',
  authUrlMethod: getUrl,
  unLink: () => unlinkService('spotify'),
  widgets: [
    { description: 'Profile', creationDialog: ProfileConfig },
    { description: 'Player', creationDialog: PlayerConfig },
    { description: 'Show player', creationDialog: ShowPlayerConfig },
  ],
}

export interface SpotifyProfile {
  name: string;
  email: string;
  followers: number;
  icon_url: string;
  is_premium: boolean;
}

export interface SpotifyState {
  profile?: SpotifyProfile;
}
