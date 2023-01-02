<template>
  <v-container v-if="authorized" class="fill-height">
    <v-responsive v-if="authorized" class="fill-height">
      <div class="text-h2">Hallo, {{ auth.student.firstName }} {{ auth.student.lastName }}!</div>
      <v-row>
        <v-col cols="12" md="4">
          <stats-card @click="router.push('/practice')"/>
        </v-col>
      </v-row>
    </v-responsive>
  </v-container>
  <v-container v-else>
      <v-dialog fullscreen v-model="logindialog">
        <Login @authed="authed()"/>
      </v-dialog>
      <v-container class="fill-height">
        <v-responsive class="d-flex align-center text-center fill-height">
          <v-img
            contain
            height="300"
            src="@/assets/logo.svg"
          />
          <p style="margin-top: 1.5rem"><b>OpenBuzz</b> ist ein alternatives Frontend für drive.buzz Artemis.<br>Um es benutzen zu können, musst du dich
            mit deinen drive.buzz Zugangsdaten anmelden.<br>Dies ist ein inoffizielles Projekt und steht in keiner
            Verbindung zu Fahrschulcockpit GmbH.</p>

          <div class="py-14"/>

          <v-row class="d-flex align-center justify-center">
            <v-col cols="auto">
              <v-btn
                color="primary"
                min-width="228"
                size="x-large"
                variant="flat"
                @click="login()"
              >
                <v-icon
                  icon="mdi-key"
                  size="large"
                  start
                />
                Anmelden
              </v-btn>
            </v-col>

          </v-row>
        </v-responsive>
      </v-container>
  </v-container>
</template>

<script setup>
import {useAuth} from "@/plugins/auth";
import {reactive, ref} from "vue";
import Login from "@/components/Login.vue";
import StatsCard from "@/components/Dashboard/StatsCard.vue";
import {useRouter} from "vue-router";

let auth = reactive(useAuth())
let authorized = ref(auth.authorized)
let logindialog = ref(false)
const router = useRouter()

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
