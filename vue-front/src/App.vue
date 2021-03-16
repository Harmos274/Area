<template>
  <v-app>
    <router-view />
  </v-app>
</template>

<script lang="ts">
import { mapMutations } from 'vuex'
import store from '@/store'
import { Component, Vue } from 'vue-property-decorator'

@Component({
  methods: {
    ...mapMutations(['setDarkTheme']),
  },
})
export default class App extends Vue {
  setDarkTheme!: (theme: boolean) => void

  created () {
    this.$vuetify.theme.dark = store.state.darkTheme
  }

  updated () {
    this.setDarkTheme(this.$vuetify.theme.dark)
  }
}
</script>
