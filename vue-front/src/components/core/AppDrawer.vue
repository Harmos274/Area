<template>
  <v-navigation-drawer
    app
    temporary
    v-model="drawer"
  >
    <v-list>
      <v-list-item-group>
        <v-list-item
          text
          v-for="[index, tab] in tabs.entries()"
          v-bind:key="index"
          @click="changeTab(tab.name)"
          :disabled="$route.name === tab.name"
        >
          <v-list-item-icon>
            <v-icon>
              {{ tab.icon }}
            </v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            {{ tab.name }}
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-list>

    <template v-slot:append>
      <v-list>
        <v-list-item>
          <light-dark-switch justify="center" />
        </v-list-item>
        <v-list-item>
          <v-btn color="red" block text @click="disconnect">Disconnect</v-btn>
        </v-list-item>
      </v-list>
    </template>
  </v-navigation-drawer>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component } from 'vue-property-decorator'
import { mapMutations } from 'vuex'
import LightDarkSwitch from '@/components/core/LightDarkSwitch.vue'
import { tabs } from '@/store'

@Component({
  components: {
    LightDarkSwitch,
  },

  methods: {
    ...mapMutations(['setDrawer']),
  },
})
export default class AppDrawer extends Vue {
  setDrawer!: (drawer: boolean) => void

  private tabs = tabs

  private changeTab (tab: string) {
    this.$router.push({ name: tab })
  }

  private disconnect () {
    this.$store.commit('setAreaState', 'LoggedOut')
    this.$router.replace({ name: 'Login' })
  }

  private get drawer (): boolean {
    return this.$store.state.drawer
  }

  private set drawer (drawer: boolean) {
    this.setDrawer(drawer)
  }
}
</script>
