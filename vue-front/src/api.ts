import axios, { AxiosRequestConfig } from 'axios'
import store, { ResourceState } from '@/store'
import { getWidget, WidgetConfig, WidgetName } from '@/widgets'
import router from '@/router'
import { PostData } from '@/reddit'
import { Service } from '@/service'

const client = {
  id: 'vue-front',
  secret: 'oui',
}

export const enum RegistrationState {
  Waiting,
  Loading,
  Success,
  UserAlreadyExists,
  Error,
}

export const enum LoginState {
  Success,
  InvalidCredentials,
  Error,
}

interface StatusResponse {
  logged_in: boolean;
}

interface ErrorResponse {
  data: {
    source: string;
    message: string;
  };
  status: number;
}

function handleError (response: ErrorResponse): void {
  if (response.status === 401) {
    store.commit('setAreaState', 'LoggedOut')

    if (router.currentRoute.name !== 'Login') {
      router.replace({ name: 'Login' })
    }
  }
}

function handleServiceError (service: Service, response: ErrorResponse): void {
  if (response.status === 403) {
    store.commit('setServiceState', { service, payload: 'Unavailable' })
  }

  handleError(response)
}

function handleErrorReddit (response: ErrorResponse): void {
  handleServiceError('reddit', response)
}

function handleErrorSpotify (response: ErrorResponse): void {
  handleServiceError('spotify', response)
}

function handleErrorGithub (response: ErrorResponse): void {
  handleServiceError('github', response)
}

function getTokenConfig (): AxiosRequestConfig {
  const str = btoa(client.id + ':' + client.secret)

  return {
    headers:
    {
      Authorization: 'Basic ' + str,
      'content-type': 'application/x-www-form-urlencoded',
    },
  }
}

export async function register (email: string,
  username: string,
  password: string): Promise<RegistrationState> {
  return axios.post('/oauth/register', { email, username, password })
    .then(() => RegistrationState.Success)
    .catch(error => {
      if (error.status === 409) return RegistrationState.UserAlreadyExists
      else return RegistrationState.Error
    })
}

export async function login (email: string, password: string):
  Promise<LoginState> {
  store.commit('setAreaState', 'Loading')

  const body = new URLSearchParams()

  body.append('grant_type', 'password')
  body.append('email', email)
  body.append('password', password)

  return axios.post('/oauth/token', body, getTokenConfig())
    .then(response => {
      store.commit('setAreaState', {
        reddit: 'LoggedOut',
        spotify: 'LoggedOut',

        widgets: [],

        token: response.data.access_token,
      })
      return LoginState.Success
    })
    .catch(error => {
      store.commit('setAreaState', 'LoggedOut')
      if (error.status === 401) return LoginState.InvalidCredentials
      else return LoginState.Error
    })
}

function getAuthConfig (): AxiosRequestConfig | undefined {
  if (typeof store.state.userData === 'object') {
    return { headers: { Authorization: `Bearer ${store.state.userData.token}` } }
  }
  return undefined
}

export function getServiceStatus (service: Service): void {
  const config = getAuthConfig()

  if (config) {
    const initialState = store.getters.serviceState(service)

    store.commit('setServiceState', { service, payload: 'Loading' })

    axios.get(`/${service}/status`, config)
      .then(response => {
        const status = response.data as StatusResponse
        let payload: ResourceState<{}> = 'LoggedOut'

        if (status.logged_in) {
          payload = {}
        }
        store.commit('setServiceState', { service, payload })
      })
      .catch(error => {
        store.commit('setServiceState', { service, payload: initialState })
        handleServiceError(service, error)
      })
  }
}

export function linkService (service: Service, code: string): void {
  const config = getAuthConfig()

  if (config) {
    store.commit('setServiceState', { service, payload: 'Loading' })

    axios.put(`/${service}/link`, { code }, config)
      .then(() => store.commit('setServiceState', { service, payload: {} }))
      .catch(error => handleServiceError(service, error))
  }
}

export function unlinkService (service: Service): void {
  const config = getAuthConfig()
  const initialState = store.getters.serviceState(service)

  if (config) {
    store.commit('setServiceState', { service, payload: 'Loading' })

    axios.put(`/${service}/unlink`, {}, config)
      .then(() => store.commit('setServiceState', { service, payload: 'LoggedOut' }))
      .catch(error => {
        store.commit('setServiceState', { service, payload: initialState })
        handleServiceError(service, error)
      })
  }
}
export function getRedditProfile (): void {
  const config = getAuthConfig()

  if (config) {
    axios.get('/reddit/profile', config)
      .then(response => store.commit('sumRedditState', { accountInfo: response.data }))
      .catch(handleErrorReddit)
  }
}

export async function getSubredditHots (subreddit: string, nbr: number): Promise<PostData[] | undefined> {
  const config = getAuthConfig()

  if (config) {
    return axios.get(`/reddit/hots?sub=${subreddit}&nbr=${nbr}`, config)
      .then(response => response.data)
      .catch(handleErrorReddit)
  } else {
    return undefined
  }
}

export function getRedditSpotlights (): void {
  const config = getAuthConfig()

  if (config) {
    axios.get('/reddit/spotlights', config)
      .then(response => store.commit('sumRedditState', { spotlights: response.data }))
      .catch(handleErrorReddit)
  }
}
export function getSpotifyProfile (): void {
  const config = getAuthConfig()

  if (config) {
    axios.get('/spotify/profile', config)
      .then(response => store.commit('sumSpotifyState', { profile: response.data }))
      .catch(handleErrorSpotify)
  }
}

export async function getSpotifyPlayerSrc (uri: string): Promise<string | undefined> {
  const config = getAuthConfig()

  if (config) {
    return axios.get(`/spotify/music?uri=${uri}`, config)
      .then(response => response.data.url)
      .catch(handleErrorSpotify)
  } else {
    return undefined
  }
}

export async function getSpotifyShowPlayerSrc (uri: string): Promise<string | undefined> {
  const config = getAuthConfig()

  if (config) {
    return axios.get(`/spotify/podcast?uri=${uri}`, config)
      .then(response => response.data.url)
      .catch(handleErrorSpotify)
  } else {
    return undefined
  }
}
export function getGithubProfile (): void {
  const config = getAuthConfig()

  if (config) {
    axios.get('/github/profile', config)
      .then(response => store.commit('sumGithubState', { profile: response.data }))
      .catch(handleErrorGithub)
  }
}

export function getGithubSpotlights (): void {
  const config = getAuthConfig()

  if (config) {
    axios.get('/github/spotlights', config)
      .then(response => store.commit('sumGithubState', { spotlights: response.data }))
      .catch(handleErrorGithub)
  }
}

export function getGithubIssues (): void {
  const config = getAuthConfig()

  if (config) {
    axios.get('/github/issues', config)
      .then(response => store.commit('sumGithubState', { issues: response.data }))
      .catch(handleErrorGithub)
  }
}

export function addWidget (type_name: WidgetName, config: WidgetConfig): void {
  const axios_config = getAuthConfig()

  const widget = { type_name, config }

  if (axios_config) {
    axios.post('/widget', widget, axios_config)
      .then(response => store.commit('addWidget', getWidget(response.data.widget_id, type_name, config)))
      .catch(handleError)
  }
}

export function getWidgets (): void {
  const config = getAuthConfig()

  if (config) {
    axios.get('/widget/list', config)
      .then(response => store.commit('setWidgets', response.data))
      .catch(handleError)
  }
}

export function removeWidget (id: number): void {
  const config = getAuthConfig()

  if (config) {
    axios.delete(`/widget/${id}`, config)
      .then(() => store.commit('removeWidget', id))
      .catch(handleError)
  }
}

export async function setWidgetConfig (id: number, config: WidgetConfig): Promise<void> {
  const axiosConfig = getAuthConfig()

  if (config) {
    return axios.patch(`/widget/${id}`, { config }, axiosConfig)
      .then(() => store.commit('configWidget', { id, config }))
      .catch(handleError)
  } else {
    return new Promise(resolve => resolve())
  }
}

export function loadApp (): void {
  getServiceStatus('reddit')
  getServiceStatus('spotify')
  getServiceStatus('github')
  getWidgets()
}
