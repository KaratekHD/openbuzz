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
            <v-icon icon="mdi-information"/>
          </template>
        </v-list-item>

      </v-list>
    </v-navigation-drawer>
    <default-bar @toggleDrawer="toggleDrawer()"/>

    <default-view/>
  </v-app>
</template>

<script setup>
import DefaultBar from './AppBar.vue'
import DefaultView from './View.vue'
import {ref} from "vue";
import {useAuth} from "@/plugins/auth";
const auth = useAuth()

let drawer = ref(false)
function toggleDrawer() {
  drawer.value = !drawer.value
}
</script>
