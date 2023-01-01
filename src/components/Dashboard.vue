<template>
  <v-container class="fill-height">
    <div v-if="authorized">
      <div class="text-h2">Hallo, {{ auth.student.firstName }} {{ auth.student.lastName }}!</div>
      <v-row>
        <v-col cols="12" md="4">
          <stats-card />
        </v-col>
      </v-row>
    </div>
    <div v-else>
      <v-dialog fullscreen v-model="logindialog">
        <Login @authed="authed()"/>
      </v-dialog>
      <v-btn @click="login()" color="primary">Anmelden</v-btn>
    </div>
  </v-container>
</template>

<script setup>
import {useAuth} from "@/plugins/auth";
import {reactive, ref} from "vue";
import Login from "@/components/Login.vue";
import StatsCard from "@/components/Dashboard/StatsCard.vue";

let auth = reactive(useAuth())
let authorized = ref(auth.authorized)
let logindialog = ref(false)

function authed() {
  logindialog.value = false
  authorized.value = true
}

function login() {
  logindialog.value = true

}
</script>

<style>
.text-h2 {
  margin-bottom: 1rem;
}
</style>
