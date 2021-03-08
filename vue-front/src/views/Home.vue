<template>
  <v-container v-if="widgets.length !== 0">
    <v-row justify="center">
      <v-col
        v-for="widget in widgets"
        v-bind:key="widget.id"
        xl="4"
        sm="6"
        cols="12"
      >
        <component
          :config="widget.config"
          :id="widget.id"
          :is="widget.constructor"
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
