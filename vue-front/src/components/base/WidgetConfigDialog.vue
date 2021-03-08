<template>
  <v-card>
    <v-card-title>{{ title }}</v-card-title>
    <v-card-text>
      {{ description }}
      <slot />
    </v-card-text>
    <v-card-actions>
      <v-spacer />
      <v-btn
        :disabled="!validator()"
        text
        @click="$emit('done')"
      >{{ buttonText }}</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Prop } from 'vue-property-decorator'
import { Widget } from '@/store/widgets'

@Component
export default class WidgetConfigDialog extends Vue {
  addWidget!: (widget: Widget) => void

  @Prop({ required: true })
  title!: string

  @Prop({ required: true })
  description!: string

  @Prop({ required: true })
  buttonText!: string

  @Prop({ required: false, default: () => () => true })
  validator!: () => boolean
}
</script>
