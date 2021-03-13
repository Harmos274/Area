<template>
  <widget-creation-dialog
    title="Spotlights"
    description="This widget displays the currently spotlighted subreddits."
    @done="$emit('done', name, {})"
    :button-text="buttonText"
  />
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import WidgetConfigDialog from '@/components/base/WidgetConfigDialog.vue'
import { WidgetName } from '@/widgets'

@Component({
  components: { WidgetCreationDialog: WidgetConfigDialog },
})
export default class SpotlightsConfig extends Vue {
  readonly name: WidgetName = 'reddit_spotlights'

  @Prop({ required: true })
  buttonText!: string
}
</script>
