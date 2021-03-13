<template>
  <widget
    :id="id"
    :loaded="loaded"
    :update-function="update"
    :refresh-timer="config.refresh"
    :configWidget="configWidget"
    :config="config"
    :loader-type="loader_type"
  >
      <iframe
        v-show="iframe_loaded"
        :src="iframe_src"
        @load="iframe_loaded = true"
        frameborder="false"
        allowtransparency="true"
        allow="encrypted-media"
        style="width: 100%; height: 97%;"
      />
    <v-skeleton-loader :type="loader_type" v-if="!iframe_loaded" />
  </widget>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import Widget from '@/components/base/Widget.vue'
import { WidgetConfig } from '@/widgets'
import ShowPlayerConfig from '@/components/widgets/spotify/ShowPlayerConfig.vue'
import { getSpotifyShowPlayerSrc } from '@/api'

@Component({
  components: {
    Widget,
  },
})
export default class ShowPlayer extends Vue {
  private configWidget = ShowPlayerConfig

  private readonly loader_type = 'image'

  private url_loaded = false
  private iframe_loaded = false
  private iframe_src = ''

  private get loaded (): boolean {
    return this.url_loaded
  }

  private update (): void {
    if (this.config.name) {
      getSpotifyShowPlayerSrc(this.config.name)
        .then(url => this.setSrc(url))
    }
  }

  private setSrc (src: string | undefined): void {
    if (src !== undefined) {
      this.iframe_src = src
      this.url_loaded = true
    } else {
      this.iframe_loaded = false
    }
  }

  @Prop({ required: true })
  id!: number

  @Prop({ required: true })
  config!: WidgetConfig
}
</script>
