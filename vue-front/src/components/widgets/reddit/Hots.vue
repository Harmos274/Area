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
    <v-list flat two-line>
      <v-list-item-group>
        <v-list-item
          v-for="[index, post] in posts.entries()"
          v-bind:key="index"
          @click="postSelected(index)"
        >
          <v-list-item-avatar>
            <v-img :src="post.thumbnail" />
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title>{{ post.title }}</v-list-item-title>
            <v-list-item-subtitle>By {{ post.author }}</v-list-item-subtitle>
          </v-list-item-content>

          <v-list-item-action-text>{{ post.score }} points</v-list-item-action-text>
        </v-list-item>
      </v-list-item-group>
    </v-list>

    <v-dialog v-model="dialog" max-width="600px">
      <v-card>
        <v-card-title>{{ dialogPost.title }}</v-card-title>
        <v-card-text>
          <v-img v-if="dialogPost.image" :src="dialogPost.image" />
          <br />
          <template v-if="dialogPost.selftext">{{ dialogPost.selftext }}</template>
        </v-card-text>
      </v-card>
    </v-dialog>
  </widget>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { WidgetConfig } from '@/store/widgets'
import Widget from '@/components/base/Widget.vue'
import HotsConfig from '@/components/widgets/reddit/HotsConfig.vue'
import { getSubredditHots } from '@/api'
import { emptyPostData, PostData } from '@/reddit'
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

  private dialog = false
  private dialogPost: PostData = emptyPostData()

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

  private postSelected (index: number): void {
    const posts = this.posts[index]

    if (posts) {
      this.dialogPost = posts
      this.dialog = true
    }
  }

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
