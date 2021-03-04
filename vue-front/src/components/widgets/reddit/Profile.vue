<template>
  <widget
    :loaded="loaded"
    :id="id"
    :refresh-timer="config.refresh"
    :update-function="update"
    :configWidget="configWidget"
  >
    <template>
      <v-list>
        <v-list-item>{{ content.name }}'s profile</v-list-item>
      </v-list>
    </template>
  </widget>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import Widget from '@/components/base/Widget.vue'
import { mapGetters } from 'vuex'
import { RedditAccountInfo } from '@/reddit'
import { profileReddit } from '@/api'
import { WidgetConfig } from '@/store/widgets'
import ProfileConfig from '@/components/widgets/reddit/ProfileConfig.vue'

@Component({
  components: {
    Widget,
  },

  computed: {
    ...mapGetters(['redditProfile', 'redditState']),
  },
})
export default class Profile extends Vue {
  redditProfile!: RedditAccountInfo | undefined

  private get loaded (): boolean {
    return !!this.redditProfile
  }

  private update (): void {
    profileReddit()
  }

  private configWidget = ProfileConfig

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
