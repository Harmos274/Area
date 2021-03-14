<template>
  <widget-creation-dialog
    title="Issues"
    description="This widget displays your issues."
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
  readonly name: WidgetName = 'github_issues'

  @Prop({ required: true })
  buttonText!: string
}
</script>
