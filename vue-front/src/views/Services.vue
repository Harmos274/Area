<template>
  <v-container>
    <v-row justify="center">
      <v-col
        v-for="[index, service] in services.entries()"
        v-bind:key="index"
        md="4"
        sm="6"
        cols="12"
      >
        <service :description="service.desc" :service="service.name" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import Service from '@/components/base/Service.vue'
import { RedditService } from '@/reddit'
import { SpotifyService } from '@/spotify'
import { GithubService } from '@/github'

@Component({
  components: {
    Service,
  },
})
export default class Services extends Vue {
  private get services () {
    return [
      { desc: RedditService, name: 'reddit' },
      { desc: SpotifyService, name: 'spotify' },
      { desc: GithubService, name: 'github' },
    ]
  }
}
</script>
