import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import store, { ServiceStatus } from '@/store'
import Home from '@/views/Home.vue'
import Auth from '@/views/Auth.vue'
import Index from '@/views/Index.vue'
import Login from '@/components/Login.vue'
import Register from '@/components/Register.vue'
import NotFound from '@/views/NotFound.vue'
import Services from '@/views/Services.vue'
import Callbacks from '@/views/callbacks/Index.vue'
import RedditCallback from '@/views/callbacks/Reddit.vue'
import SpotifyCallback from '@/views/callbacks/Spotify.vue'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    component: Index,
    beforeEnter: (_to, _from, next: Function) => {
      if (store.getters.areaStatus !== ServiceStatus.LoggedIn) next({ name: 'Login' })
      else next()
    },
    children: [
      {
        path: '',
        name: 'Home',
        component: Home,
      },
      {
        path: 'services',
        name: 'Services',
        component: Services,
      },
      {
        path: 'callbacks',
        name: 'Callback Index',
        component: Callbacks,
        children: [
          {
            path: 'reddit',
            name: 'Reddit Callback',
            component: RedditCallback,
          },
          {
            path: 'spotify',
            name: 'Spotify Callback',
            component: SpotifyCallback,
          },
        ],
      },
    ],
  },
  {
    path: '/auth',
    name: 'Auth',
    component: Auth,
    beforeEnter: (_to, _from, next: Function) => {
      if (store.getters.areaStatus === ServiceStatus.LoggedIn) next({ name: 'Home' })
      else next()
    },
    children: [
      {
        path: 'login',
        name: 'Login',
        component: Login,
      },
      {
        path: 'register',
        name: 'Register',
        component: Register,
      },
    ],
  },
  {
    path: '*',
    component: NotFound,
  },
]

const router = new VueRouter({
  mode: 'history',
  routes,
})

export default router
