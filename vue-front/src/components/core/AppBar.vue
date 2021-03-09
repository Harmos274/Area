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
      <v-row align="center">
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

        <v-menu :close-on-content-click="false">
          <template v-slot:activator="{ on, attrs }">
            <v-btn icon v-bind="attrs" v-on="on">
              <v-icon>mdi-cog</v-icon>
            </v-btn>
          </template>

          <v-list>
            <v-list-item>
              <light-dark-switch justify="center" />
            </v-list-item>
            <v-list-item>
              <v-btn color="red" block text @click="disconnect">Disconnect</v-btn>
            </v-list-item>
          </v-list>
        </v-menu>
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
