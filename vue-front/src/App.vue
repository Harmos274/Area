<template>
  <v-app>
    <router-view />
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapMutations } from 'vuex'
import store from '@/store'

export default Vue.extend({
  name: 'App',

  methods: {
    ...mapMutations(['setDarkTheme']),
  },

  created () {
    this.$vuetify.theme.dark = store.state.darkTheme
  },

  updated () {
    this.setDarkTheme(this.$vuetify.theme.dark)
  },
})
</script>
