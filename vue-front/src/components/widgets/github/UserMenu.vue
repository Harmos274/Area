<template>
  <v-menu
    v-model="menu"
    transition="scale-transition"
  >
    <template #activator="{ on }">
      <slot v-bind:on="on" />
    </template>

    <v-card>
      <v-list>
        <v-list-item>
          <v-list-item-avatar>
            <v-img :src="avatarUrl" />
          </v-list-item-avatar>
          <v-list-item-title>
            {{ user.login }}
          </v-list-item-title>
        </v-list-item>
      </v-list>
      <v-card-actions>
        <v-btn block @click="openProfile">Profile</v-btn>
      </v-card-actions>
    </v-card>
  </v-menu>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { GithubUser } from '@/github'
import { avatar_fallback_url } from '@/definitions'

@Component
export default class UserMenu extends Vue {
  private menu = false

  private openProfile (): void {
    window.open(this.user.account_url)
  }

  private get avatarUrl (): string {
    return this.user.avatar_url || avatar_fallback_url
  }

  @Prop({ required: true })
  user!: GithubUser
}
</script>
