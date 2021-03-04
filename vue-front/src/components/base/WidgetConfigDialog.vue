<template>
  <v-card>
    <v-card-title>{{ title }}</v-card-title>
    <v-card-text>
      {{ description }}
      <slot />
    </v-card-text>
    <v-card-actions>
      <v-spacer />
      <v-btn text @click="$emit('done', name, config)">{{ buttonText }}</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Prop } from 'vue-property-decorator'
import { Widget, WidgetConfig, WidgetName } from '@/store/widgets'

function defaultConfig (): WidgetConfig {
  return {}
}

@Component
export default class WidgetConfigDialog extends Vue {
  addWidget!: (widget: Widget) => void

  @Prop({ required: true })
  title!: string

  @Prop({ required: true })
  description!: string

  @Prop({ required: true })
  name!: WidgetName

  @Prop({ required: false, default: defaultConfig })
  config!: WidgetConfig

  @Prop({ required: true })
  buttonText!: string
}
</script>
