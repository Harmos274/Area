import { baseSelfUrl } from '@/definitions'
import { unlinkSpotify } from '@/api'

const client = {
  id: '028e47fb0da04eae8cb2ab3b3d7da1b9',
  redirect: `${baseSelfUrl}/callbacks/spotify`,
  authUrlBase: 'https://accounts.spotify.com/authorize',
  scopes: ['playlist-read-private'],
}

export function getUrl (): URL {
  const authUrl = new URL(client.authUrlBase)

  authUrl.searchParams.append('client_id', client.id)
  authUrl.searchParams.append('response_type', 'code')
  authUrl.searchParams.append('state', 'croacroa')
  authUrl.searchParams.append('redirect_uri', client.redirect)
  authUrl.searchParams.append('scope', client.scopes.join(' '))

  return authUrl
}

export const SpotifyService = {
  headerSrcLight: require('@/assets/Spotify_Logo_Green.png'),
  headerSrcDark: require('@/assets/Spotify_Logo_Green.png'),
  brandColor: '#1DB954',
  authUrlMethod: getUrl,
  unLink: unlinkSpotify,
  widgets: [],
}
