import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import axios from 'axios'
import { baseApiUrl } from '@/definitions'

Vue.config.productionTip = false

axios.defaults.baseURL = baseApiUrl
axios.interceptors.response.use(
  response => ({ ...response, data: response.data.data }),
  // eslint-disable-next-line prefer-promise-reject-errors
  error => Promise.reject({ ...error.response, data: error.response.data.data }),
)

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App),
}).$mount('#app')
