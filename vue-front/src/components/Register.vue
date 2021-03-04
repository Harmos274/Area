<template>
  <v-card class="elevation-12">
    <v-toolbar
      color="primary"
      dark
      flat
    >
      <v-toolbar-title>Register</v-toolbar-title>
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
          v-model="login"
        />

        <v-text-field
          label="Username"
          name="username"
          prepend-icon="mdi-account"
          type="text"
          v-model="username"
        />

        <v-text-field
          id="password1"
          label="Password"
          name="password"
          prepend-icon="mdi-lock"
          type="password"
          v-model="password1"
        />
        <v-text-field
          id="password2"
          label="Confirm password"
          name="password"
          prepend-icon="mdi-lock"
          type="password"
          v-model="password2"
          v-on:keyup.enter="tryRegister"
        />
      </v-form>
    </v-card-text>
    <v-card-actions>
      <v-spacer />
      <v-btn color="primary"
        elevation="0"
        @click="tryRegister"
        :disabled="!isValid"
        :loading="isLoading"
        type="submit"
      >
        Register
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { register, RegistrationState } from '@/api'

@Component
export default class Register extends Vue {
  private login = ''
  private username = ''
  private password1 = ''
  private password2 = ''
  private state = RegistrationState.Waiting

  get isValid (): boolean {
    return this.login !== '' &&
      this.username !== '' &&
      this.password1 !== '' &&
      this.password1 === this.password2 &&
      this.state !== RegistrationState.Loading
  }

  get isLoading (): boolean {
    return this.state === RegistrationState.Loading
  }

  private async tryRegister () {
    if (this.isValid) {
      this.state = RegistrationState.Loading
      this.state = await register(this.login, this.username, this.password1)

      if (this.state === RegistrationState.Success) {
        this.$router.replace({ name: 'Login' })
      }
    }
  }
}
</script>
