<template>
  <v-app>
    <v-navigation-drawer
      app
      v-model="drawer"
    >
      <v-list-item title="OpenBuzz" subtitle="Alternatives Frontend für drive.buzz Artemis"/>
      <v-divider/>


      <v-list
        dense
        nav
      >
        <v-list-item rounded to="/" color="primary" title="Startseite">
          <template v-slot:prepend>
            <v-icon icon="mdi-home"/>
          </template>
        </v-list-item>
        <v-list-item v-if="auth.authorized" to="/practice" color="primary" title="Übungsbogen">
          <template v-slot:prepend>
            <v-icon icon="mdi-format-list-checks"/>
          </template>
        </v-list-item>
        <v-list-item href="//github.com/KaratekHD/OpenBuzz" color="primary" title="Quellcode">
          <template v-slot:prepend>
            <v-icon icon="mdi-code-tags"/>
          </template>
        </v-list-item>
        <v-divider v-if="auth.authorized" />
        <v-list-item @click="logout()" color="primary" title="Abmelden">
          <template v-slot:prepend>
            <v-icon icon="mdi-logout"/>
          </template>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <default-bar @customtheme="customTheme()" @toggleDrawer="toggleDrawer()"/>

    <default-view/>

  </v-app>
</template>

<script setup>
import DefaultBar from './AppBar.vue'
import DefaultView from './View.vue'
import {inject, onMounted, ref} from "vue";
import {useAuth} from "@/plugins/auth";
import {useTheme} from "vuetify";

const auth = useAuth()

let drawer = ref(false)
const theme = useTheme()
let useCustomTheme = false
const cookies = inject("$cookies")

function logout() {
  cookies.remove("auth")
  window.location.assign("/")
}
function customTheme() {
  useCustomTheme = true
  theme.global.name.value = theme.global.current.value.dark ? 'light' : 'dark'
}

function toggleDrawer() {
  drawer.value = !drawer.value
}

onMounted(() => {
  if (!useCustomTheme) {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      theme.global.name.value = "dark"
    }
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', event => {
      if (!useCustomTheme) {
        theme.global.name.value = event.matches ? "dark" : "light"
      }
    });
  }
})
</script>
