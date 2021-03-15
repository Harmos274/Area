<template>
  <div id="spotifycallback" />
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { linkService } from '@/api'

@Component
export default class SpotifyCallback extends Vue {
  created () {
    const state = this.$route.query.state
    const code = this.$route.query.code

    if (state === 'croacroa' && typeof code === 'string') {
      linkService('spotify', code)
    } else {
      console.log('Spotify callback: Invalid arguments')
    }

    this.$router.replace({ name: 'Services' })
  }
}
</script>
