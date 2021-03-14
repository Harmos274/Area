<template>
  <widget-creation-dialog
    title="Spotlights"
    description="This widget displays the most popular repositories on Github."
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
  readonly name: WidgetName = 'github_spotlights'

  @Prop({ required: true })
  buttonText!: string
}
</script>
