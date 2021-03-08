<template>
  <widget-creation-dialog
    title="Profile Viewer"
    description="This widget displays some information about your reddit profile."
    @done="$emit('done', name, {})"
    :button-text="buttonText"
  />
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import WidgetConfigDialog from '@/components/base/WidgetConfigDialog.vue'
import { WidgetName } from '@/store/widgets'

@Component({
  components: { WidgetCreationDialog: WidgetConfigDialog },
})
export default class ProfileConfig extends Vue {
  readonly name: WidgetName = 'reddit_profile'

  @Prop({ required: true })
  buttonText!: string
}
</script>
