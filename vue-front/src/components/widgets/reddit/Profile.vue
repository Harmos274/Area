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
      <v-avatar size="32px"><v-img :src="content.icon_url" /></v-avatar>
    </template>
    <v-list>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title>{{ content.comment_karma }} comment karma</v-list-item-title>
          <v-list-item-title>{{ content.link_karma }} link karma</v-list-item-title>
          <v-list-item-title>{{ content.comment_karma + content.link_karma }} total karma</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </widget>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import Widget from '@/components/base/Widget.vue'
import { mapGetters } from 'vuex'
import { RedditAccountInfo } from '@/reddit'
import { getRedditProfile } from '@/api'
import { WidgetConfig } from '@/widgets'
import ProfileConfig from '@/components/widgets/reddit/ProfileConfig.vue'

@Component({
  components: {
    Widget,
  },

  computed: {
    ...mapGetters(['redditProfile']),
  },
})
export default class Profile extends Vue {
  redditProfile!: RedditAccountInfo | undefined

  private get loaded (): boolean {
    return !!this.redditProfile
  }

  private update: () => void = getRedditProfile

  private configWidget = ProfileConfig

  private get title (): string {
    return `${this.content.name}'s Reddit profile`
  }

  private get content (): RedditAccountInfo {
    const state = this.redditProfile

    if (state) {
      return state
    } else {
      return {
        name: '',
        icon_url: '',
        awardee_karma: 0,
        awarder_karma: 0,
        link_karma: 0,
        comment_karma: 0,
      }
    }
  }

  @Prop({ required: true })
  id!: number

  @Prop({ required: true })
  config!: WidgetConfig
}
</script>
