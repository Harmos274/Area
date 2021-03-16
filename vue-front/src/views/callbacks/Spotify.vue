<template>
  <div />
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { linkService } from '@/api'
import { stateString } from '@/definitions'

@Component
export default class SpotifyCallback extends Vue {
  created () {
    const state = this.$route.query.state
    const code = this.$route.query.code

    if (state === stateString && typeof code === 'string') {
      linkService('spotify', code)
    } else {
      console.log('Spotify callback: Invalid arguments')
    }

    this.$router.replace({ name: 'Services' })
  }
}
</script>
