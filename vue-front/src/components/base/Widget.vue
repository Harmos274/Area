<script src="../../store/index.ts"></script>
<template>
  <v-card>
    <v-card-text class="text--primary">
      <slot v-if="loaded" />
      <v-skeleton-loader v-else type="image" />
    </v-card-text>

    <v-divider />

    <v-card-actions>
      <v-btn icon @click="dialog = true"><v-icon>mdi-cog</v-icon></v-btn>
      <v-spacer />
      <v-btn icon @click="removeSelf"><v-icon color="red">mdi-close</v-icon></v-btn>
    </v-card-actions>

    <v-dialog max-width="600px" v-model="dialog">
      <component :is="configWidget" @done="updateConfig" button-text="Apply" />
    </v-dialog>
  </v-card>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { removeWidget } from '@/api'
import { VueConstructor } from 'vue'
import { WidgetConfig, WidgetName } from '@/store/widgets'

@Component
export default class Widget extends Vue {
  created () {
    this.updateFunction()

    if (this.refreshTimer && this.refreshTimer > 0) {
      this.intervalId = setInterval(this.updateFunction, 60 * this.refreshTimer)
    }
  }

  destroyed () {
    if (this.intervalId !== undefined) {
      clearInterval(this.intervalId)
    }
  }

  private intervalId: number | undefined = undefined
  private dialog = false

  private removeSelf (): void {
    removeWidget(this.id)
  }

  private updateConfig (name: WidgetName, config: WidgetConfig): void {
    this.dialog = false
    console.log(name, config)
  }

  @Prop({ required: true })
  loaded!: boolean

  @Prop({ required: true })
  id!: number

  @Prop({ required: true })
  refreshTimer!: number

  @Prop({ required: true })
  updateFunction!: () => void

  @Prop({ required: true })
  configWidget!: VueConstructor<Vue>
}
</script>
