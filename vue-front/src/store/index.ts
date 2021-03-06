import Vue, { VueConstructor } from 'vue'
import Vuex from 'vuex'
import VuexPersist from 'vuex-persist'
import { Widget, WidgetConstructor, getWidgetConstructor, WidgetConfig } from '@/widgets'
import { RedditState, RedditAccountInfo, PostData, Spotlight } from '@/reddit'
import { SpotifyState } from '@/spotify'
import { GithubState, GithubRepo } from '@/github'
import { Service } from '@/service'

Vue.use(Vuex)

function reduceUserData (data: ResourceState<UserData>): ResourceState<UserData> {
  if (typeof data === 'object') {
    return {
      reddit: 'Unknown',
      spotify: 'Unknown',
      github: 'Unknown',

      widgets: [],

      token: data.token,
    }
  } else {
    return 'Unavailable'
  }
}

const vuexStorage = new VuexPersist({
  key: 'sourcelink',
  storage: window.localStorage,
  reducer: (state: StoreState): StoreState => ({
    userData: reduceUserData(state.userData),

    darkTheme: state.darkTheme,
    drawer: false,
  }),
})

export const enum ServiceStatus {
  LoggedIn,
  LoggedOut,
  Loading,
}

export type ResourceState<T> = T | 'Unavailable' | 'Loading' | 'Unknown'

export interface WidgetCreator {
  description: string;
  creationDialog: VueConstructor;
}

interface UserData {
  reddit: ResourceState<RedditState>;
  spotify: ResourceState<SpotifyState>;
  github: ResourceState<GithubState>;

  widgets: Array<Widget>;

  token: string;
}

interface StoreState {
  userData: ResourceState<UserData>;

  darkTheme: boolean;
  drawer: boolean;
}

function defaultStoreState (): StoreState {
  return {
    userData: 'Unavailable',

    darkTheme: true,
    drawer: false,
  }
}

export const tabs = [
  { name: 'Home', icon: 'mdi-home' },
  { name: 'Services', icon: 'mdi-cog' },
]

export function getServiceStatus<T> (service: ResourceState<T>): ServiceStatus {
  if (service === 'Unknown') return ServiceStatus.LoggedOut
  if (service === 'Loading') return ServiceStatus.Loading
  if (service === 'Unavailable') return ServiceStatus.LoggedOut
  if (typeof service === 'object') return ServiceStatus.LoggedIn
  return ServiceStatus.LoggedOut
}

export interface ConfigPayload {
  id: number;
  config: WidgetConfig;
}

export interface HotsPayload {
  subreddit: string;
  hots: PostData[];
}

export default new Vuex.Store({
  plugins: [vuexStorage.plugin],
  state: defaultStoreState(),
  mutations: {
    setAreaState (state, payload: ResourceState<UserData>) {
      state.userData = payload
    },
    setServiceState (state, { service, payload }: { service: Service; payload: ResourceState<{}> }) {
      if (typeof state.userData === 'object') {
        state.userData[service] = payload
      }
    },
    sumRedditState (state, payload: RedditState) {
      if (typeof state.userData === 'object' && typeof state.userData.reddit === 'object') {
        state.userData.reddit = { ...state.userData.reddit, ...payload }
      }
    },
    sumSpotifyState (state, payload: SpotifyState) {
      if (typeof state.userData === 'object' && typeof state.userData.spotify === 'object') {
        state.userData.spotify = { ...state.userData.spotify, ...payload }
      }
    },
    sumGithubState (state, payload: GithubState) {
      if (typeof state.userData === 'object' && typeof state.userData.github === 'object') {
        state.userData.github = { ...state.userData.github, ...payload }
      }
    },

    setWidgets (state, widgets: Array<Widget>) {
      if (typeof state.userData === 'object') {
        state.userData.widgets = widgets
      }
    },
    addWidget (state, widget: Widget) {
      if (typeof state.userData === 'object') {
        state.userData.widgets.push(widget)
      }
    },
    configWidget (state, { id, config }: ConfigPayload) {
      if (typeof state.userData === 'object') {
        const widget = state.userData.widgets.find(widget => widget.id === id)

        if (widget) {
          widget.config = config
        }
      }
    },
    removeWidget (state, id: number) {
      if (typeof state.userData === 'object') {
        state.userData.widgets = state.userData.widgets.filter(widget => widget.id !== id)
      }
    },

    setDarkTheme (state, theme: boolean) {
      state.darkTheme = theme
    },
    setDrawer (state, drawer: boolean) {
      state.drawer = drawer
    },
  },
  getters: {
    areaStatus: (state): ServiceStatus => {
      return getServiceStatus(state.userData)
    },
    serviceStatus: (state, getters) => (service: Service): ServiceStatus => {
      return getServiceStatus(getters.serviceState(service))
    },

    serviceState: (state) => (service: Service) => {
      if (typeof state.userData === 'object') {
        return state.userData[service]
      } else {
        return 'Unavailable'
      }
    },
    redditProfile: (state): RedditAccountInfo | undefined => {
      if (typeof state.userData === 'object' && typeof state.userData.reddit === 'object') {
        return state.userData.reddit.accountInfo
      } else {
        return undefined
      }
    },
    redditSpotlights: (state): Spotlight[] | undefined => {
      if (typeof state.userData === 'object' && typeof state.userData.reddit === 'object') {
        return state.userData.reddit.spotlights
      } else {
        return undefined
      }
    },
    spotifyState: (state, getters): ResourceState<SpotifyState> => getters.serviceState('spotify'),

    githubState: (state, getters): ResourceState<GithubState> => getters.serviceState('github'),
    githubSpotlights: (state): GithubRepo[] | undefined => {
      if (typeof state.userData === 'object' && typeof state.userData.github === 'object') {
        return state.userData.github.spotlights
      } else {
        return undefined
      }
    },

    widgets: (state): Array<WidgetConstructor> => {
      if (typeof state.userData === 'object') {
        return state.userData.widgets
          .map(getWidgetConstructor)
          .filter((arg): arg is WidgetConstructor => !!arg)
      } else {
        return []
      }
    },
  },
  actions: {
  },
  modules: {
  },
})
