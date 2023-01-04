<template>
  <v-app-bar flat>
    <v-app-bar-nav-icon @click="$emit('toggleDrawer')"/>
    <v-app-bar-title to="/">
      OpenBuzz
    </v-app-bar-title>
    <template v-slot:append>

      <v-btn icon @click="$emit('customtheme')">
        <v-icon v-if="theme.global.name.value === 'dark'" icon="mdi-weather-sunny"/>
        <v-icon v-else icon="mdi-weather-night"/>
      </v-btn>
      <v-btn icon v-if="auth.authorized" @click="logout()">
        <v-icon icon="mdi-logout"/>
      </v-btn>
    </template>
  </v-app-bar>
</template>

<script setup>
import {useTheme} from "vuetify";
import {useAuth} from "@/plugins/auth";
import {inject} from "vue";

const auth = useAuth()

const theme = useTheme()
const cookies = inject("$cookies")

function logout() {
  cookies.remove("auth")
  window.location.assign("/")
}
</script>
