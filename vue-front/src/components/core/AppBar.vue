<template>
  <v-app-bar
    app
    color="background"
    dark
    elevate-on-scroll
  >
    <v-app-bar-nav-icon
      class="hidden-sm-and-up"
      @click="setDrawer(true)"
    />

    <h1>Area</h1>

    <v-container fluid class="hidden-xs-only">
      <v-row>
        <v-btn
          text
          v-for="[index, tab] in tabs.entries()"
          v-bind:key="index"
          @click="changeTab(tab.name)"
          :disabled="$route.name === tab.name"
        >
          {{ tab.name }}
        </v-btn>

        <v-spacer />

        <light-dark-switch justify="end" />
        <v-btn color="red" text @click="disconnect">Disconnect</v-btn>
      </v-row>
    </v-container>
  </v-app-bar>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import LightDarkSwitch from '@/components/core/LightDarkSwitch.vue'
import { mapMutations } from 'vuex'
import { tabs } from '@/store'

@Component({
  components: {
    LightDarkSwitch,
  },

  methods: {
    ...mapMutations(['setDrawer']),
  },
})
export default class AppBar extends Vue {
  private tabs = tabs

  private changeTab (tab: string) {
    this.$router.push({ name: tab })
  }

  private disconnect () {
    this.$store.commit('setAreaState', 'LoggedOut')
    this.$router.replace({ name: 'Login' })
  }
}
</script>
