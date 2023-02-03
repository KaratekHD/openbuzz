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
        <v-list-item v-if="auth.authorized" to="/exam" color="primary" title="Vorprüfung">
          <template v-slot:prepend>
            <v-icon icon="mdi-school"/>
          </template>
        </v-list-item>
        <v-list-item v-if="auth.authorized" to="/appointments" color="primary" title="Termine">
          <template v-slot:prepend>
            <v-icon icon="mdi-calendar"/>
          </template>
        </v-list-item>
        <v-list-item v-if="auth.authorized" to="/balance" color="primary" title="Kontoübersicht">
          <template v-slot:prepend>
            <v-icon icon="mdi-currency-eur"/>
          </template>
        </v-list-item>
        <v-list-item v-if="auth.authorized" to="/docs" color="primary" title="Dokumente">
          <template v-slot:prepend>
            <v-icon icon="mdi-file"/>
          </template>
          <template v-slot:append>
            <v-badge v-if="unread !== 0" inline :content="unread" color="error"/>
          </template>
        </v-list-item>
        <v-divider/>
        <v-list-item href="//github.com/KaratekHD/OpenBuzz" color="primary" title="Quellcode">
          <template v-slot:prepend>
            <v-icon icon="mdi-code-tags"/>
          </template>

        </v-list-item>
        <v-divider v-if="auth.authorized" />
        <v-list-item @click="logout()" color="primary" title="Abmelden" v-if="auth.authorized">
          <template v-slot:prepend>
            <v-icon icon="mdi-logout"/>
          </template>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <default-bar @customtheme="customTheme()" @toggleDrawer="toggleDrawer()" :unread="unread !== 0"/>

    <default-view/>

    <v-bottom-navigation v-if="mobileRef" flat>
      <v-btn variant="plain" value="home" to="/" icon color="primary">
        <v-icon icon="mdi-home"></v-icon>
        <span>Home</span>
      </v-btn>
      <v-btn variant="plain" v-if="auth.authorized" value="practice" to="/practice" icon color="primary">
        <v-icon icon="mdi-format-list-checks"></v-icon>
        <span>Übungsbogen</span>
      </v-btn>
      <v-btn variant="plain" value="exam" v-if="auth.authorized" to="/exam" icon color="primary">
        <v-icon icon="mdi-school"></v-icon>
        <span>Vorprüfung</span>
      </v-btn>
    </v-bottom-navigation>

  </v-app>
</template>

<script setup>
import DefaultBar from './AppBar.vue'
import DefaultView from './View.vue'
import {inject, onMounted, reactive, ref} from "vue";
import {useAuth} from "@/plugins/auth";
import {useDisplay, useTheme} from "vuetify";
import docs from "@/services/docs";

const auth = reactive(useAuth())


let drawer = ref(false)
const theme = useTheme()
let useCustomTheme = false
const cookies = inject("$cookies")
let bottomNav = ref(0)
const { mobile } = useDisplay()
let mobileRef = ref(mobile)
let unread = ref(0)
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

onMounted(async () => {
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
  unread.value = await docs.getUnread(auth.token)
})
</script>
