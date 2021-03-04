<template>
  <widget-creation-dialog
    title="Profile Viewer"
    description="This widget displays some information about your reddit profile."
    :name="name"
    @done="propagateEvent"
    :button-text="buttonText"
  />
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import WidgetConfigDialog from '@/components/base/WidgetConfigDialog.vue'
import { WidgetConfig, WidgetName } from '@/store/widgets'

@Component({
  components: { WidgetCreationDialog: WidgetConfigDialog },
})
export default class ProfileConfig extends Vue {
  private name: WidgetName = 'reddit_profile'

  private propagateEvent (name: WidgetName, config: WidgetConfig) {
    this.$emit('done', name, config)
  }

  @Prop({ required: true })
  buttonText!: string
}
</script>
