<template>
  <v-card
    outlined
  >
    <v-img
      contain
      class="ma-2"
      :src="headerSrc"
      aspect-ratio="2.5"
    />

    <v-divider role="presentation" class="mx-2" />

    <v-card-text>
      <v-container class="grow">
        <v-row v-for="[index, widget] in service.widgets.entries()" v-bind:key="index" align="center">
          <div> {{ widget.description }} </div>

          <v-spacer />

          <v-btn
            :color="service.brandColor"
            icon
            :disabled="!isLoggedIn"
            @click="openModal(index)"
          >
            <v-icon>mdi-plus</v-icon>
          </v-btn>
        </v-row>
      </v-container>
    </v-card-text>

    <v-divider role="presentation" class="mx-2"/>

    <v-card-actions>
      <v-btn
        v-if="!isLoggedIn || isLoading"
        text
        block
        :loading="isLoading"
        :disabled="isLoading"
        :color="service.brandColor"
        @click="signIn"
      >
        Sign in
      </v-btn>

      <v-btn
        v-else
        text
        block
        color="red"
        @click="service.unLink"
      >
        Disconnect
      </v-btn>
    </v-card-actions>

    <v-dialog max-width="600px" v-model="dialog">
      <component :is="dialogWidget" @done="confirmDialog" button-text="Add" />
    </v-dialog>

  </v-card>
</template>

<script lang="ts">
import Vue, { VueConstructor } from 'vue'
import { Component, Prop } from 'vue-property-decorator'
import { mapMutations } from 'vuex'
import { ServiceStatus } from '@/store'
import Empty from '@/components/Empty.vue'
import { ServiceDescription } from '@/service'
import { WidgetName, WidgetConfig } from '@/widgets'
import { addWidget } from '@/api'

@Component({
  methods: {
    ...mapMutations(['addWidget']),
  },
})
export default class Service extends Vue {
  addWidget!: (name: string) => void;

  private dialog = false
  private dialogWidget: VueConstructor = Empty

  private confirmDialog (name: WidgetName, config: WidgetConfig): void {
    addWidget(name, config)
    this.dialog = false
  }

  get headerSrc () {
    return this.$vuetify.theme.dark ? this.service.headerSrcDark : this.service.headerSrcLight
  }

  get isLoggedIn () {
    return this.status === ServiceStatus.LoggedIn
  }

  get isLoading () {
    return this.status === ServiceStatus.Loading
  }

  private signIn (): void {
    window.location.href = this.service.authUrlMethod().href
  }

  private openModal (index: number): void {
    this.dialogWidget = this.service.widgets[index].creationDialog
    this.dialog = true
  }

  @Prop({ required: true })
  service!: ServiceDescription

  @Prop({ required: true })
  status!: ServiceStatus
}
</script>
