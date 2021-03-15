<template>
  <v-card height="350px" style="display: flex; flex-direction: column">
    <template v-if="loaded">
      <v-card-title v-if="!noTitle">
        <slot name="title" />
      </v-card-title>
      <v-card-text
        class="text--primary flex-grow-1 overflow-y-auto"
        :class="scrollbarTheme"
        v-if="!fullBody"
      >
        <slot />
      </v-card-text>
      <template v-else><slot /></template>
    </template>
    <v-skeleton-loader height="100%" v-else :type="loaderType" />

    <v-divider />

    <v-card-actions>
      <v-btn icon @click="dialog = true"><v-icon>mdi-cog</v-icon></v-btn>
      <v-spacer />
      <v-btn icon @click="removeSelf">
        <v-icon color="red">mdi-close</v-icon>
      </v-btn>
    </v-card-actions>

    <v-dialog max-width="600px" v-model="dialog">
      <component
        :is="configWidget"
        @done="updateConfig"
        button-text="Apply"
        :config="config"
      />
    </v-dialog>
  </v-card>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { removeWidget, setWidgetConfig } from '@/api'
import { VueConstructor } from 'vue'
import { WidgetConfig, WidgetName } from '@/widgets'

@Component
export default class Widget extends Vue {
  created () {
    this.updateFunction()

    if (this.refreshTimer !== undefined && this.refreshTimer > 0) {
      this.intervalId = setInterval(
        this.updateFunction, 60 * this.refreshTimer,
      )
    }
  }

  destroyed () {
    if (this.intervalId !== undefined && this.refreshTimer > 0) {
      clearInterval(this.intervalId)
    }
  }

  private intervalId: number | undefined = undefined
  private dialog = false

  private removeSelf (): void {
    removeWidget(this.id)
  }

  private updateConfig (_: WidgetName, config: WidgetConfig): void {
    this.dialog = false
    setWidgetConfig(this.id, config).then(this.updateFunction)
  }

  private get scrollbarTheme () {
    return this.$vuetify.theme.dark ? 'dark' : 'light'
  }

  @Prop({ required: false, default: true })
  loaded!: boolean

  @Prop({ required: true })
  id!: number

  @Prop({ required: true })
  refreshTimer!: number

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  @Prop({ required: false, default: () => {} })
  updateFunction!: () => void

  @Prop({ required: true })
  configWidget!: VueConstructor

  @Prop({ required: true })
  config!: WidgetConfig

  @Prop({ required: false, default: 'card-heading, image, image' })
  loaderType!: string

  @Prop({ required: false, default: false, type: Boolean })
  noTitle!: boolean

  @Prop({ required: false, default: false, type: Boolean })
  fullBody!: boolean
}
</script>

<style>
.light::-webkit-scrollbar {
  width: 6px;
}

.light::-webkit-scrollbar-thumb {
  background: darkgrey;
  border-radius: 7px;
}

.light::-webkit-scrollbar-thumb:hover {
  background: grey;
}

.dark::-webkit-scrollbar {
  width: 6px;
}

.dark::-webkit-scrollbar-thumb {
  background: grey;
  border-radius: 7px;
}

.dark::-webkit-scrollbar-thumb:hover {
  background: dimgray;
}

.light {
  scrollbar-width: thin;
  scrollbar-color: darkgrey transparent;
}

.dark {
  scrollbar-width: thin;
  scrollbar-color: dimgray transparent;
}
</style>
