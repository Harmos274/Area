<template>
  <v-card class="elevation-12">
    <v-toolbar
      color="primary"
      dark
      flat
    >
      <v-toolbar-title>Login</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-title>Area</v-toolbar-title>
    </v-toolbar>
    <v-card-text>
      <v-form>
        <v-text-field
          label="Login"
          name="login"
          prepend-icon="mdi-account"
          type="text"
          v-model="username"
        />

        <v-text-field
          id="password"
          label="Password"
          name="password"
          prepend-icon="mdi-lock"
          type="password"
          v-model="password"
          v-on:keyup.enter="tryLogIn"
        />
      </v-form>
    </v-card-text>
    <v-card-actions>
      <v-btn color="primary"
        text
        @click="redirectRegister"
      >
        Register
      </v-btn>
      <v-spacer />
      <v-btn color="primary"
        elevation="0"
        @click="tryLogIn"
        :disabled="!isValid"
        :loading="isLoading"
      >
        Login
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { ServiceStatus } from '@/store'
import { login, LoginState } from '@/api'

@Component
export default class Login extends Vue {
  private username = ''
  private password = ''

  private redirectRegister (): void {
    this.$router.replace({ name: 'Register' })
  }

  get isValid (): boolean {
    return this.username !== '' &&
      this.password !== '' &&
      !this.isLoading
  }

  get isLoading (): boolean {
    return this.$store.getters.areaStatus === ServiceStatus.Loading
  }

  private async tryLogIn () {
    if (this.isValid) {
      const ret = await login(this.username, this.password)

      if (ret === LoginState.Success) {
        this.$router.replace({ name: 'Home' })
      }
    }
  }
}
</script>
