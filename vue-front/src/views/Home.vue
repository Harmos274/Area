<template>
  <v-container v-if="widgets.length != 0">
    <v-row>
      <v-col>
        <component
          v-for="widget in widgets"
          :is="widget.constructor"
          v-bind:key="widget.id"
          :config="widget.config"
          :id="widget.id"
        />
      </v-col>
    </v-row>
  </v-container>
  <h4 v-else align="center" justify="center">You have no widget enabled yet.</h4>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { mapGetters } from 'vuex'

@Component({
  computed: {
    ...mapGetters(['widgets']),
  },
})
export default class Home extends Vue {}
</script>
