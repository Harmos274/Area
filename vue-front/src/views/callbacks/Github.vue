<template>
  <div />
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { linkService } from '@/api'

@Component
export default class GithubCallback extends Vue {
  created () {
    const state = this.$route.query.state
    const code = this.$route.query.code

    if (state === 'croacroa' && typeof code === 'string') {
      linkService('github', code)
    } else {
      console.log('Github callback: Invalid arguments')
    }

    this.$router.replace({ name: 'Services' })
  }
}
</script>
