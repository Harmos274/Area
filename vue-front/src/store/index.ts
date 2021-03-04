import Vue, { VueConstructor } from 'vue'
import Vuex from 'vuex'
import VuexPersist from 'vuex-persist'
import { Widget, WidgetConstructor, getWidgetConstructor } from '@/store/widgets'
import { RedditState, RedditAccountInfo } from '@/reddit'

Vue.use(Vuex)

function reduceUserData (data: ResourceState<UserData>): ResourceState<UserData> {
  if (typeof data === 'object') {
    return {
      reddit: 'Unknown',
      spotify: 'Unknown',

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
  creationDialog: VueConstructor<Vue>;
}

export interface SpotifyState { placeholder: {} }

interface UserData {
  reddit: ResourceState<RedditState>;
  spotify: ResourceState<SpotifyState>;

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

export interface Tab {
  name: string;
  icon: string;
}

export const tabs: Array<Tab> = [
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

export default new Vuex.Store({
  plugins: [vuexStorage.plugin],
  state: defaultStoreState(),
  mutations: {
    setAreaState (state, payload: ResourceState<UserData>) {
      state.userData = payload
    },
    setRedditState (state, payload: ResourceState<RedditState>) {
      if (typeof state.userData === 'object') {
        state.userData.reddit = payload
      }
    },
    setRedditProfile (state, payload: RedditAccountInfo | undefined) {
      if (typeof state.userData === 'object' && typeof state.userData.reddit === 'object') {
        state.userData.reddit = { ...state.userData.reddit, accountInfo: payload }
      }
    },
    setSpotifyState (state, payload: ResourceState<SpotifyState>) {
      if (typeof state.userData === 'object') {
        state.userData.spotify = payload
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
    redditStatus: (state, getters): ServiceStatus => {
      return getServiceStatus(getters.redditState)
    },
    spotifyStatus: (state, getters): ServiceStatus => {
      return getServiceStatus(getters.spotifyState)
    },

    redditState: (state): ResourceState<RedditState> => {
      if (typeof state.userData === 'object') {
        return state.userData.reddit
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
    spotifyState: (state): ResourceState<SpotifyState> => {
      if (typeof state.userData === 'object') {
        return state.userData.spotify
      } else {
        return 'Unavailable'
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
