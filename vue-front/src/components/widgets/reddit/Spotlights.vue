<template>
  <widget
    :loaded="redditSpotlights !== []"
    :id="id"
    :refresh-timer="config.refresh"
    :update-function="updateFunction"
    :configWidget="configWidget"
    :config="config"
  >
    <template v-slot:title>Reddit's spotlights</template>
    <v-list flat two-line>
      <v-list-item-group @change="spotlightSelected">
        <v-list-item v-for="[index, spotlight] in redditSpotlights.entries()" v-bind:key="index">
          <v-list-item-avatar>
            <v-img :src="spotlight.icon_url" />
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title>
              {{ spotlight.name }}
            </v-list-item-title>
            <v-list-item-subtitle>
              {{ spotlight.description }}
            </v-list-item-subtitle>
          </v-list-item-content>

          <v-list-item-action-text>
            {{ spotlight.population }} members
          </v-list-item-action-text>
        </v-list-item>
      </v-list-item-group>
    </v-list>

    <v-dialog v-model="dialog" max-width="600px">
      <v-card>
        <v-img :src="dialogSpotlight.banner_url" />
        <v-card-title>{{ dialogSpotlight.name }}</v-card-title>
        <v-card-text>
          {{ dialogSpotlight.description }}
        </v-card-text>
        <v-card-actions>
          <v-btn block @click="visit">Visit</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </widget>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { WidgetConfig } from '@/store/widgets'
import Widget from '@/components/base/Widget.vue'
import { getRedditSpotlights } from '@/api'
import { emptySpotliht, Spotlight } from '@/reddit'
import { mapGetters } from 'vuex'
import SpotlightsConfig from '@/components/widgets/reddit/SpotlightsConfig.vue'

@Component({
  components: { Widget },

  computed: {
    ...mapGetters(['redditSpotlights']),
  },
})
export default class Spotlights extends Vue {
  redditSpotlights!: Spotlight[]

  private configWidget = SpotlightsConfig

  private dialog = false
  private dialogSpotlight: Spotlight = emptySpotliht()

  private updateFunction (): void {
    getRedditSpotlights()
  }

  private spotlightSelected (index: number | undefined): void {
    let success = true

    if (index !== undefined) {
      const spotlight = this.redditSpotlights[index]

      if (spotlight) {
        this.dialogSpotlight = spotlight
      } else {
        success = false
      }
    }

    if (success) {
      this.dialog = true
    }
  }

  private visit () {
    window.open(`https://reddit.com/r/${this.dialogSpotlight.name}`)
  }

  @Prop({ required: true })
  id!: number

  @Prop({ required: true })
  config!: WidgetConfig
}
</script>
