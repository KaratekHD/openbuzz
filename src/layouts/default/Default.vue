<template>
  <v-app>
    <v-navigation-drawer
        v-model="drawer"
        app
    >
      <v-list-item subtitle="Alternatives Frontend für drive.buzz Artemis" title="OpenBuzz"/>
      <v-divider/>


      <v-list
          dense
          nav
      >
        <v-list-item color="primary" rounded title="Startseite" to="/">
          <template v-slot:prepend>
            <v-icon icon="mdi-home"/>
          </template>
        </v-list-item>
        <v-list-item v-if="auth.authorized" color="primary" title="Übungsbogen" to="/practice">
          <template v-slot:prepend>
            <v-icon icon="mdi-format-list-checks"/>
          </template>
        </v-list-item>
        <v-list-item v-if="auth.authorized" color="primary" title="Spielwiese" to="/playground">
          <template v-slot:prepend>
            <v-icon icon="mdi-teddy-bear"/>
          </template>
        </v-list-item>
        <v-list-item v-if="auth.authorized" color="primary" title="Vorprüfung" to="/exam">
          <template v-slot:prepend>
            <v-icon icon="mdi-school"/>
          </template>
        </v-list-item>
        <v-list-item v-if="auth.authorized" color="primary" title="Termine" to="/appointments">
          <template v-slot:prepend>
            <v-icon icon="mdi-calendar"/>
          </template>
        </v-list-item>
        <v-list-item v-if="auth.authorized" color="primary" title="Kontoübersicht" to="/balance">
          <template v-slot:prepend>
            <v-icon icon="mdi-currency-eur"/>
          </template>
        </v-list-item>
        <v-list-item v-if="auth.authorized" color="primary" title="Dokumente" to="/docs">
          <template v-slot:prepend>
            <v-icon icon="mdi-file"/>
          </template>
          <template v-slot:append>
            <v-badge v-if="unread !== 0" :content="unread" color="error" inline/>
          </template>
        </v-list-item>
        <v-divider/>
        <v-list-item color="primary" href="//github.com/KaratekHD/OpenBuzz" title="Quellcode">
          <template v-slot:prepend>
            <v-icon icon="mdi-code-tags"/>
          </template>

        </v-list-item>
        <v-list-item color="primary" @click="update()" title="Auf Updates prüfen">
          <template v-slot:prepend>
            <v-icon icon="mdi-update"/>
          </template>

        </v-list-item>
        <v-divider v-if="auth.authorized"/>
        <v-list-item v-if="auth.authorized" color="primary" title="Abmelden" @click="logout()">
          <template v-slot:prepend>
            <v-icon icon="mdi-logout"/>
          </template>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <default-bar :unread="unread !== 0" @customtheme="customTheme()" @toggleDrawer="toggleDrawer()"/>

    <default-view/>

    <v-bottom-navigation v-if="mobileRef" flat>
      <v-btn color="primary" icon to="/" value="home" variant="plain">
        <v-icon icon="mdi-home"></v-icon>
        <span>Home</span>
      </v-btn>
      <v-btn v-if="auth.authorized" color="primary" icon to="/practice" value="practice" variant="plain">
        <v-icon icon="mdi-format-list-checks"></v-icon>
        <span>Übungsbogen</span>
      </v-btn>
      <v-btn v-if="auth.authorized" color="primary" icon to="/exam" value="exam" variant="plain">
        <v-icon icon="mdi-school"></v-icon>
        <span>Vorprüfung</span>
      </v-btn>
    </v-bottom-navigation>

    <v-dialog :max-width="(mobileRef ? '100%' : '30%')" v-model="updatedialog">
      <v-card>
        <v-card-title>Serviceworker aktualisiert.</v-card-title>
        <v-card-text>
          Die App muss neu gestartet bzw. die Seite neu geladen werden, damit die Änderungen in Kraft treten.<br>
          Bitte beachte, dass die Änderungen möglicherweise nicht sichtbar sind.
        </v-card-text>
        <v-card-actions>
          <v-spacer/>
          <v-btn color="primary" @click="updatedialog = false">OK</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

  </v-app>
</template>

<script setup>
import DefaultBar from './AppBar.vue'
import DefaultView from './View.vue'
import {inject, onMounted, reactive, ref} from "vue";
import {useAuth} from "@/plugins/auth";
import {useDisplay, useTheme} from "vuetify";
import docs from "@/services/docs";
import {useRegisterSW} from "virtual:pwa-register/vue";

const auth = reactive(useAuth())


let drawer = ref(false)
const theme = useTheme()
let useCustomTheme = false
const cookies = inject("$cookies")
let bottomNav = ref(0)
const {mobile} = useDisplay()
let mobileRef = ref(mobile)
let unread = ref(0)
let updatedialog = ref(false)

const {
  offlineReady,
  needRefresh,
  updateServiceWorker,
} = useRegisterSW()

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

function update() {
  updateServiceWorker()
  updatedialog.value = true

}
</script>
