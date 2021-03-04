<template>
  <widget-creation-dialog
    title="Subreddit Viewer"
    description="This widget displays the latest and hottest posts from a given subreddit."
    id="0"
    :config="subreddit"
    @done="$emit('done')"
  >
    <v-text-field v-model="subreddit" />
  </widget-creation-dialog>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import WidgetConfigDialog from '@/components/base/WidgetConfigDialog.vue'
import { WidgetConfig } from '@/store/widgets'

@Component({
  components: { WidgetCreationDialog: WidgetConfigDialog },
})
export default class HotCreator extends Vue {
  private config: WidgetConfig = {
    name: '',
  }
}
</script>
