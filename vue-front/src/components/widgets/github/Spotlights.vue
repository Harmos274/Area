<template>
  <widget
    :loaded="content !== []"
    :id="id"
    :refresh-timer="config.refresh"
    :update-function="updateFunction"
    :configWidget="configWidget"
    :config="config"
  >
    <template #title>Github's spotlights</template>
    <v-list flat two-line>
      <v-list-item-group>
        <v-list-item
          v-for="[index, spotlight] in content.entries()"
          v-bind:key="index"
          @click="spotlightSelected(index)"
        >
          <v-list-item-avatar>
            <v-img :src="spotlight.owner.avatar_url" />
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
            {{ spotlight.stargazers_count }} stars
          </v-list-item-action-text>
        </v-list-item>
      </v-list-item-group>
    </v-list>

    <v-dialog v-model="dialog" max-width="600px">
      <v-card>
        <v-card-title>
          {{ dialogSpotlight.name }}
          <v-spacer />
          By {{ dialogSpotlight.owner.login }}
        </v-card-title>
        <v-card-subtitle>
          {{ dialogSpotlight.watchers_count }}
          <v-icon small class="mr-1">mdi-eye</v-icon>
          {{ dialogSpotlight.stargazers_count }}
          <v-icon small>mdi-star</v-icon>
        </v-card-subtitle>
        <v-card-text>
          {{ dialogSpotlight.description }}
          <br />
          Written in {{ dialogSpotlight.language }}
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
import { getGithubSpotlights } from '@/api'
import { GithubRepo, emptyRepo } from '@/github'
import { mapGetters } from 'vuex'
import SpotlightsConfig from '@/components/widgets/github/SpotlightsConfig.vue'

@Component({
  components: { Widget },

  computed: {
    ...mapGetters(['githubSpotlights']),
  },
})
export default class Spotlights extends Vue {
  githubSpotlights!: GithubRepo[] | undefined

  private configWidget = SpotlightsConfig

  private dialog = false
  private dialogSpotlight: GithubRepo = emptyRepo

  private updateFunction: () => void = getGithubSpotlights

  private get content (): GithubRepo[] {
    const spotlights = this.githubSpotlights

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
    window.open(this.dialogSpotlight.repo_url)
  }

  @Prop({ required: true })
  id!: number

  @Prop({ required: true })
  config!: WidgetConfig
}
</script>
