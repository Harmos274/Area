<template>
  <div>
    <app-drawer />

    <app-bar />

    <v-main>
      <router-view />
    </v-main>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import AppBar from '@/components/core/AppBar.vue'
import { loadApp } from '@/api'
import AppDrawer from '@/components/core/AppDrawer.vue'

@Component({
  components: {
    AppBar,
    AppDrawer,
  },
})

export default class Index extends Vue {
  setDarkTheme!: (theme: boolean) => void;
  drawer = true

  created () {
    loadApp()
  }
}
</script>
