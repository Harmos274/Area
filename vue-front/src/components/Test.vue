<template>
  <h1>{{ config }}</h1>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component
export default class Test extends Vue {
  @Prop({ default: 'Test' })
  config!: string
}
</script>
