<template>
  <div id="redditcallback" />
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { linkService } from '@/api'

@Component
export default class RedditCallback extends Vue {
  created () {
    const state = this.$route.query.state
    const code = this.$route.query.code

    if (state === 'croacroa' && typeof code === 'string') {
      linkService('reddit', code)
    } else {
      console.log('Reddit callback: Invalid arguments')
    }

    this.$router.replace({ name: 'Services' })
  }
}
</script>
