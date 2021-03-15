<template>
  <widget
    :loaded="loaded"
    :id="id"
    :refresh-timer="config.refresh"
    :update-function="update"
    :configWidget="configWidget"
    :config="config"
  >
    <template #title>
      {{ title }}
      <v-spacer />
      <v-avatar size="32px"><v-img :src="avatarUrl" /></v-avatar>
    </template>
    <v-list>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title v-if="content.company">Working at {{ content.company }}</v-list-item-title>
          <v-list-item-title>{{ content.public_repos }} public repositories</v-list-item-title>
          <v-list-item-title>{{ content.private_repos }} private repositories</v-list-item-title>
          <v-list-item-title>{{ content.public_gists }} public gists</v-list-item-title>
          <v-list-item-title>{{ content.private_gists }} private gists</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </widget>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import Widget from '@/components/base/Widget.vue'
import { mapGetters } from 'vuex'
import { GithubProfile, GithubState, emptyGithubProfile } from '@/github'
import { getGithubProfile } from '@/api'
import { WidgetConfig } from '@/widgets'
import ProfileConfig from '@/components/widgets/github/ProfileConfig.vue'
import { ResourceState } from '@/store'
import { avatar_fallback_url } from '@/definitions'

@Component({
  components: {
    Widget,
  },

  computed: {
    ...mapGetters(['githubState']),
  },
})
export default class Profile extends Vue {
  githubState!: ResourceState<GithubState>

  private get loaded (): boolean {
    return typeof this.githubState === 'object'
  }

  private update: () => void = getGithubProfile

  private configWidget = ProfileConfig

  private get title (): string {
    return `${this.content.name}'s Github profile`
  }

  private get content (): GithubProfile {
    const state = this.githubState

    if (typeof state === 'object' && state.profile !== undefined) {
      return state.profile
    } else {
      return emptyGithubProfile
    }
  }

  private get avatarUrl (): string {
    return this.content.avatar_url || avatar_fallback_url
  }

  @Prop({ required: true })
  id!: number

  @Prop({ required: true })
  config!: WidgetConfig
}
</script>
