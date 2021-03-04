<template>
  <v-row :justify="justify" align="center">
    <v-icon class="mr-2">
      mdi-weather-sunny
    </v-icon>
    <v-switch
      v-model="$vuetify.theme.dark"
    />
    <v-icon class="ml-2">
      mdi-weather-night
    </v-icon>
  </v-row>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Prop } from 'vue-property-decorator'

@Component
export default class LightDarkSwitch extends Vue {
  @Prop({ default: 'center' })
  justify!: string
}
</script>
