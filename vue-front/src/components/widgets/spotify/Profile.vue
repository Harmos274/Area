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
          <v-list-item-title>{{ content.followers }} followers</v-list-item-title>
          <v-list-item-title v-if="content.is_premium">Premium account</v-list-item-title>
          <v-list-item-title v-else>Free account</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </widget>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import Widget from '@/components/base/Widget.vue'
import { mapGetters } from 'vuex'
import { getSpotifyProfile } from '@/api'
import { WidgetConfig } from '@/widgets'
import ProfileConfig from '@/components/widgets/spotify/ProfileConfig.vue'
import { SpotifyProfile, SpotifyState } from '@/spotify'
import { ResourceState } from '@/store'
import { avatar_fallback_url } from '@/definitions'

@Component({
  components: {
    Widget,
  },

  computed: {
    ...mapGetters(['spotifyState']),
  },
})
export default class Profile extends Vue {
  spotifyState!: ResourceState<SpotifyState>

  private get stateProfile (): SpotifyProfile | undefined {
    const state = this.spotifyState

    if (typeof state === 'object' && state.profile !== undefined) {
      return state.profile
    }
    return undefined
  }

  private get loaded (): boolean {
    return this.stateProfile !== undefined
  }

  private update: () => void = getSpotifyProfile

  private configWidget = ProfileConfig

  private get title (): string {
    return `${this.content.name}'s Spotify profile`
  }

  private get content (): SpotifyProfile {
    const state = this.stateProfile

    if (state) {
      return state
    } else {
      return {
        name: '',
        email: '',
        icon_url: '',
        followers: 0,
        is_premium: false,
      }
    }
  }

  private get avatarUrl (): string {
    return this.content.icon_url || avatar_fallback_url
  }

  @Prop({ required: true })
  id!: number

  @Prop({ required: true })
  config!: WidgetConfig
}
</script>
