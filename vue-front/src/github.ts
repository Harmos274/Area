import { baseSelfUrl, stateString } from '@/definitions'
import { ServiceDescription } from '@/service'
import { unlinkService } from '@/api'
import ProfileConfig from '@/components/widgets/github/ProfileConfig.vue'
import SpotlightsConfig from '@/components/widgets/github/SpotlightsConfig.vue'
import IssuesConfig from '@/components/widgets/github/IssuesConfig.vue'

const client = {
  id: process.env.VUE_APP_GITHUB_CLIENT_ID || '22d3c289a00c01c981d9',
  redirect: `${baseSelfUrl}/callbacks/github`,
  authUrlBase: 'https://github.com/login/oauth/authorize',
  scopes: ['read:user', 'repo'],
}

export function getUrl (): URL {
  const authUrl = new URL(client.authUrlBase)

  authUrl.searchParams.append('client_id', client.id)
  authUrl.searchParams.append('redirect_uri', client.redirect)
  authUrl.searchParams.append('scope', client.scopes.join(' '))
  authUrl.searchParams.append('state', stateString)

  return authUrl
}

export const GithubService: ServiceDescription = {
  headerImageLight: require('@/assets/Github_Logo_OnWhite.png'),
  headerImageDark: require('@/assets/Github_Logo_OnDark.png'),
  brandColor: '#4078c0',
  authUrlMethod: getUrl,
  unLink: () => unlinkService('github'),
  widgets: [
    { description: 'Profile', creationDialog: ProfileConfig },
    { description: 'Spotlights', creationDialog: SpotlightsConfig },
    { description: 'Issues', creationDialog: IssuesConfig },
  ],
}

export interface GithubProfile {
  name: string;
  avatar_url: string;
  account_url: string;
  company: string;
  location: string;
  bio: string;
  public_repos: number;
  private_repos: number;
  public_gists: number;
  private_gists: number;
  followers: number;
  following: number;
  updated_at: string;
}

export const emptyGithubProfile: GithubProfile = {
  name: '',
  avatar_url: '',
  account_url: '',
  company: '',
  location: '',
  bio: '',
  public_repos: 0,
  private_repos: 0,
  public_gists: 0,
  private_gists: 0,
  followers: 0,
  following: 0,
  updated_at: '',
}

export interface GithubUser {
  login: string;
  avatar_url: string;
  account_url: string;
  type: string;
  site_admin: boolean;
}

export const emptyUser = {
  login: '',
  avatar_url: '',
  account_url: '',
  type: '',
  site_admin: false,
}

export interface GithubRepo {
  name: string;
  full_name: string;
  description: string;
  owner: GithubUser;
  repo_url: string;
  created_at: string;
  updated_at: string;
  pushed_at: string;
  stargazers_count: number;
  watchers_count: number;
  language: string;
  score: number;
  open_issues: number;
}

export const emptyRepo: GithubRepo = {
  name: '',
  full_name: '',
  description: '',
  owner: emptyUser,
  repo_url: '',
  created_at: '',
  updated_at: '',
  pushed_at: '',
  stargazers_count: 0,
  watchers_count: 0,
  language: '',
  score: 0,
  open_issues: 0,
}

export interface Label {
  name: string;
  description: string;
  color: string;
}

export interface Issue {
  issue_url: string;
  number: number;
  state: string;
  title: string;
  body: string;
  user: GithubUser;
  labels: Label[];
  assignees: GithubUser[];
  comments: number;
  created_at: string;
  updated_at: string;
  closed_at: string;
  repository: GithubRepo;
}

export const emptyIssue: Issue = {
  issue_url: '',
  number: 0,
  state: '',
  title: '',
  body: '',
  user: emptyUser,
  labels: [],
  assignees: [],
  comments: 0,
  created_at: '',
  updated_at: '',
  closed_at: '',
  repository: emptyRepo,
}

export interface GithubState {
  profile?: GithubProfile;
  spotlights?: GithubRepo[];
  issues?: Issue[];
}
