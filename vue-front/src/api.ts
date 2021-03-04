import axios, { AxiosRequestConfig } from 'axios'
import store from '@/store'
import { getWidget, WidgetConfig, WidgetName } from '@/store/widgets'
import router from '@/router'

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

    if (router.currentRoute.name === 'Login') {
      router.replace({ name: 'Login' })
    }
  }
}

function handleErrorReddit (response: ErrorResponse): void {
  if (response.status === 403) {
    store.commit('setRedditState', {})
  }

  handleError(response)
}

function handleErrorSpotify (response: ErrorResponse): void {
  if (response.status === 403) {
    store.commit('setSpotifyState', {})
  }

  handleError(response)
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

export function linkReddit (code: string): void {
  const config = getAuthConfig()

  if (config) {
    store.commit('setRedditState', 'Loading')

    axios.post('/reddit/link', { code }, config)
      .then(() => store.commit('setRedditState', {}))
      .catch(handleErrorReddit)
  }
}

export function unlinkReddit (): void {
  const config = getAuthConfig()
  const initialState = store.getters.redditState

  if (config) {
    store.commit('setRedditState', 'Loading')

    axios.post('/reddit/unlink', {}, config)
      .then(() => store.commit('setRedditState', 'LoggedOut'))
      .catch(error => {
        store.commit('setRedditState', initialState)
        handleErrorReddit(error)
      })
  }
}

export function statusReddit (): void {
  const config = getAuthConfig()

  if (config) {
    const initialState = store.getters.redditState

    store.commit('setRedditState', 'Loading')

    axios.get('/reddit/status', config)
      .then(response => {
        const status = response.data as StatusResponse

        if (status.logged_in) {
          store.commit('setRedditState', {})
        } else {
          store.commit('setRedditState', 'LoggedOut')
        }
      })
      .catch((error) => {
        store.commit('setRedditState', initialState)
        handleErrorReddit(error)
      })
  }
}

export function profileReddit (): void {
  const config = getAuthConfig()

  if (config) {
    axios.get('/reddit/profile', config)
      .then(response => store.commit('setRedditProfile', response.data))
      .catch(handleErrorReddit)
  }
}

export function linkSpotify (code: string): void {
  const config = getAuthConfig()

  if (config) {
    store.commit('setSpotifyState', 'Loading')

    axios.post('/spotify/link', { code }, config)
      .then(() => store.commit('setSpotifyState', {}))
      .catch(handleErrorSpotify)
  }
}

export function unlinkSpotify (): void {
  const config = getAuthConfig()

  if (config) {
    const initialState = store.getters.spotifyState

    store.commit('setSpotifyState', 'Loading')

    axios.post('/spotify/unlink', {}, config)
      .then(() => store.commit('setSpotifyState', 'LoggedOut'))
      .catch(error => {
        store.commit('setSpotifyState', initialState)
        handleErrorSpotify(error)
      })
  }
}

export function statusSpotify (): void {
  const config = getAuthConfig()

  if (config) {
    const initialState = store.getters.spotifyState

    store.commit('setSpotifyState', 'Loading')

    axios.get('/spotify/status', config)
      .then(response => {
        const status = response.data as StatusResponse

        if (status.logged_in) {
          store.commit('setSpotifyState', {})
        } else {
          store.commit('setSpotifyState', 'LoggedOut')
        }
      })
      .catch(error => {
        store.commit('setSpotifyState', initialState)
        handleErrorSpotify(error)
      })
  }
}

export function addWidget (type_name: WidgetName, config: WidgetConfig): void {
  const axios_config = getAuthConfig()

  const widget = { type_name, config }

  if (axios_config) {
    axios.post('/widget/add', widget, axios_config)
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

export function loadApp (): void {
  statusReddit()
  statusSpotify()
  getWidgets()
}
