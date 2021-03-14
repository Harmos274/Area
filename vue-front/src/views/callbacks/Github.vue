<template>
  <div />
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { linkGithub } from '@/api'

@Component
export default class GithubCallback extends Vue {
  created () {
    const state = this.$route.query.state
    const code = this.$route.query.code

    if (state === 'croacroa' && typeof code === 'string') {
      linkGithub(code)
    } else {
      console.log('Github callback: Invalid arguments')
    }

    this.$router.replace({ name: 'Services' })
  }
}
</script>
