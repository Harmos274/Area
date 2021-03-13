<template>
  <widget-creation-dialog
    title="Spotify player"
    description="This widget allows you to play music from Spotify."
    @done="$emit('done', name, { name: uri })"
    :button-text="buttonText"
    :validator="validator"
  >
    <v-text-field label="Music URI" v-model="uri" />
  </widget-creation-dialog>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import WidgetConfigDialog from '@/components/base/WidgetConfigDialog.vue'
import { WidgetConfig, WidgetName } from '@/widgets'

@Component({
  components: { WidgetCreationDialog: WidgetConfigDialog },
})
export default class PlayerConfig extends Vue {
  readonly name: WidgetName = 'spotify_music'

  private uri = ''

  created () {
    if (this.config.name !== undefined) {
      this.uri = this.config.name
    }
  }

  private validator (): boolean {
    return this.uri.length !== 0
  }

  @Prop({ required: true })
  buttonText!: string

  @Prop({ required: false, default: () => ({ name: '' }) })
  config!: WidgetConfig
}
</script>
