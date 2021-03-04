<template>
  <service
    :header-src-dark="require('@/assets/Reddit_Lockup_OnDark.png')"
    :header-src-light="require('@/assets/Reddit_Lockup_OnWhite.png')"
    brand-color="#FF4500"
    :auth-url-method="getUrl"
    :service-status="$store.getters.redditStatus"
    :widgets="widgets"
    :un-link="unlink"
  />
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import Service from '@/components/base/Service.vue'
import { getUrl } from '@/reddit'
import { WidgetCreator } from '@/store'
import { unlinkReddit } from '@/api'
import HotCreator from '@/components/widgets/reddit/HotCreator.vue'
import ProfileConfig from '@/components/widgets/reddit/ProfileConfig.vue'

@Component({
  components: {
    Service,
  },

  methods: {
    getUrl,
  },
})

export default class RedditService extends Vue {
  private widgets: Array<WidgetCreator> = [
    { description: 'Profile', creationDialog: ProfileConfig },
  ]

  private unlink = unlinkReddit
}
</script>
