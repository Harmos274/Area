<template>
  <widget-creation-dialog
    title="Subreddit Viewer"
    description="This widget displays the latest and hottest posts from a given subreddit."
    @done="$emit('done', name, { name: subreddit, number })"
    :button-text="buttonText"
    :validator="validator"
  >
    <v-text-field label="Subreddit" v-model="subreddit" />
    <v-slider
      thumb-label
      label="Number of posts to load"
      min="1"
      max="20"
      v-model="number"
    />
  </widget-creation-dialog>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import WidgetConfigDialog from '@/components/base/WidgetConfigDialog.vue'
import { WidgetConfig, WidgetName } from '@/widgets'

@Component({
  components: { WidgetCreationDialog: WidgetConfigDialog },
})
export default class HotsConfig extends Vue {
  readonly name: WidgetName = 'reddit_hots'

  private subreddit = ''
  private number = 10

  created () {
    if (this.config.name !== undefined) {
      this.subreddit = this.config.name
    }
    if (this.config.number !== undefined) {
      this.number = this.config.number
    }
  }

  private validator (): boolean {
    return this.subreddit.length !== 0
  }

  @Prop({ required: true })
  buttonText!: string

  @Prop({ required: false, default: () => ({ name: '', number: 10 }) })
  config!: WidgetConfig
}
</script>
