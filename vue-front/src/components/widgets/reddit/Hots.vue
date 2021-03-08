<template>
  <widget
    :loaded="posts !== []"
    :id="id"
    :refresh-timer="config.refresh"
    :update-function="updateFunction"
    :configWidget="configWidget"
    :config="config"
  >
    <template v-slot:title>{{ title }}</template>
    <v-data-table
      :headers="headers"
      :items="posts"
      item-key="title"
      hide-default-footer
      show-expand
      single-expand
    >
      <template v-slot:item.thumbnail="{ item }">
        <v-avatar size="35px"><v-img :src="item.thumbnail" /></v-avatar>
      </template>
      <template v-slot:expanded-item="{ item }">
        <v-img v-if="item.image" :src="item.image" />
        <template v-if="item.selftext">{{ item.selftext }}</template>
      </template>
    </v-data-table>
  </widget>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { WidgetConfig } from '@/store/widgets'
import Widget from '@/components/base/Widget.vue'
import HotsConfig from '@/components/widgets/reddit/HotsConfig.vue'
import { getSubredditHots } from '@/api'
import { PostData } from '@/reddit'
import { mapGetters } from 'vuex'

@Component({
  components: { Widget },

  computed: {
    ...mapGetters(['redditHots']),
  },
})
export default class Hots extends Vue {
  redditHots!: Map<string, PostData[]> | undefined

  private configWidget = HotsConfig

  private updateFunction (): void {
    if (this.config.name !== undefined && this.config.number !== undefined) {
      getSubredditHots(this.config.name, this.config.number)
    }
  }

  private get title (): string {
    if (this.config.name) {
      return `r/${this.config.name}'s hot posts`
    } else {
      return 'Loading'
    }
  }

  private expanded = []

  readonly headers = [
    { text: 'Title', value: 'title', sortable: false, align: 'start' },
    { text: 'Author', value: 'author', sortable: false, align: 'start' },
    { text: 'Score', value: 'score', sortable: false, align: 'start' },
    { text: '', value: 'thumbnail', sortable: false, align: 'end' },
  ]

  private get posts (): PostData[] {
    const hots = this.redditHots

    if (hots && this.config.name) {
      const posts = hots.get(this.config.name)

      if (posts) {
        return posts
      }
    }
    return []
  }

  @Prop({ required: true })
  id!: number

  @Prop({ required: true })
  config!: WidgetConfig
}
</script>
