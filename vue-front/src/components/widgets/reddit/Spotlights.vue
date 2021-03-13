<template>
  <widget
    :loaded="content !== []"
    :id="id"
    :refresh-timer="config.refresh"
    :update-function="updateFunction"
    :configWidget="configWidget"
    :config="config"
  >
    <template v-slot:title>Reddit's spotlights</template>
    <v-list flat two-line>
      <v-list-item-group>
        <v-list-item
          v-for="[index, spotlight] in content.entries()"
          v-bind:key="index"
          @click="spotlightSelected(index)"
        >
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
import { WidgetConfig } from '@/widgets'
import Widget from '@/components/base/Widget.vue'
import { getRedditSpotlights } from '@/api'
import { emptySpotlight, Spotlight } from '@/reddit'
import { mapGetters } from 'vuex'
import SpotlightsConfig from '@/components/widgets/reddit/SpotlightsConfig.vue'

@Component({
  components: { Widget },

  computed: {
    ...mapGetters(['redditSpotlights']),
  },
})
export default class Spotlights extends Vue {
  redditSpotlights!: Spotlight[] | undefined

  private configWidget = SpotlightsConfig

  private dialog = false
  private dialogSpotlight: Spotlight = emptySpotlight()

  private updateFunction (): void {
    getRedditSpotlights()
  }

  private get content (): Spotlight[] {
    const spotlights = this.redditSpotlights

    if (spotlights !== undefined) {
      return spotlights
    } else {
      return []
    }
  }

  private spotlightSelected (index: number): void {
    if (this.content.length > index) {
      this.dialogSpotlight = this.content[index]
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
