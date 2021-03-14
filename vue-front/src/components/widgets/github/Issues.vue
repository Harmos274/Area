<template>
  <widget
    :loaded="content !== []"
    :id="id"
    :refresh-timer="config.refresh"
    :update-function="updateFunction"
    :configWidget="configWidget"
    :config="config"
  >
    <template v-slot:title>Github issues</template>
    <v-list flat two-line>
      <v-list-item-group>
        <v-list-item
          v-for="[index, issue] in content.entries()"
          v-bind:key="index"
          @click="spotlightSelected(index)"
        >
          <v-list-item-content>
            <v-list-item-title>
              {{ issue.repository.name }} - {{ issue.title }}
            </v-list-item-title>
            <v-list-item-subtitle>
              Opened by {{ issue.user.login }}
            </v-list-item-subtitle>
          </v-list-item-content>

          <v-list-item-action-text>
            {{ issue.comments }} comments
          </v-list-item-action-text>
        </v-list-item>
      </v-list-item-group>
    </v-list>

    <v-dialog v-model="dialog" max-width="600px">
      <v-card>
        <v-card-title>
          {{ dialogIssue.repository.name }} - {{ dialogIssue.title }}
          <v-spacer />
          <v-tooltip
            v-for="[index, label] in dialogIssue.labels.entries()"
            v-bind:key="index"
            top
          >
            <template v-slot:activator="{ on, attrs }">
              <v-chip
                :color="`#${label.color}`"
                class="ml-2"
                small
                v-bind="attrs"
                v-on="on"
              >
                {{ label.name }}
              </v-chip>
            </template>
            {{ label.description }}
          </v-tooltip>
        </v-card-title>
        <v-card-subtitle>
          Opened by {{ dialogIssue.user.login }}
        </v-card-subtitle>

        <v-card-text>
          {{ dialogIssue.body }}
          <v-spacer />
          Assignees:
          <user-menu
            v-for="[index, user] in dialogIssue.assignees.entries()"
            v-bind:key="index"
            :user="user"
          >
            <template v-slot:default="{ on }">
              <v-avatar v-on="on" size="32" class="ma-1">
                <v-img :src="user.avatar_url" />
              </v-avatar>
            </template>
          </user-menu>
        </v-card-text>
        <v-card-actions>
          <v-btn block @click="visit">Open issue</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </widget>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { WidgetConfig } from '@/widgets'
import Widget from '@/components/base/Widget.vue'
import { getGithubIssues } from '@/api'
import { GithubState, Issue, emptyIssue } from '@/github'
import { mapGetters } from 'vuex'
import IssuesConfig from '@/components/widgets/github/IssuesConfig.vue'
import { ResourceState } from '@/store'
import UserMenu from '@/components/widgets/github/UserMenu.vue'

@Component({
  components: { UserMenu, Widget },

  computed: {
    ...mapGetters(['githubState']),
  },
})
export default class Issues extends Vue {
  githubState!: ResourceState<GithubState>

  private configWidget = IssuesConfig

  private dialog = false
  private dialogIssue: Issue = emptyIssue

  private updateFunction: () => void = getGithubIssues

  private get content (): Issue[] {
    const state = this.githubState

    if (typeof state === 'object' && state.issues !== undefined) {
      return state.issues
    } else {
      return []
    }
  }

  private spotlightSelected (index: number): void {
    if (this.content.length > index) {
      this.dialogIssue = this.content[index]
      this.dialog = true
    }
  }

  private visit () {
    window.open(this.dialogIssue.issue_url)
  }

  @Prop({ required: true })
  id!: number

  @Prop({ required: true })
  config!: WidgetConfig
}
</script>
