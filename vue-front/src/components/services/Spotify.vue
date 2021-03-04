<template>
  <service
    :header-src-dark="require('@/assets/Spotify_Logo_Green.png')"
    :header-src-light="require('@/assets/Spotify_Logo_Green.png')"
    brand-color="#1DB954"
    :auth-url-method="getUrl"
    :service-status="$store.getters.spotifyStatus"
    :widgets="[]"
    :un-link="unlink"
  />
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import Service from '@/components/base/Service.vue'
import { getUrl } from '@/spotify'
import { unlinkSpotify } from '@/api'

@Component({
  components: {
    Service,
  },

  methods: {
    getUrl,
  },
})

export default class SpotifyService extends Vue {
  private unlink = unlinkSpotify
}
</script>
