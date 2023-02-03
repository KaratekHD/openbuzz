<template>
  <v-card>
    <v-container class="fill-height">
      <v-responsive class="d-flex align-center text-center fill-height">
        <h1 class="text-h2" style="margin-top: 1rem;">Willkommen zurück!</h1>


        <div class="py-14"/>

        <v-row class="d-flex align-center justify-center">

          <v-form>
            <v-text-field
              class="mb-2"
              label="Email"
              v-model="email"
            ></v-text-field>
            <v-text-field
              class="mb-2"
              v-model="password"
              label="Passwort"
              type="password"
            ></v-text-field>
            <v-checkbox v-model="keep_login" label="Angemeldet bleiben"></v-checkbox>
            <v-btn
              color="primary"
              min-width="228"
              rel="noopener noreferrer"
              size="x-large"
              variant="flat"
              @click="signin()"
              :loading="loading"
            >
              <v-icon
                icon="mdi-login"
                size="large"
                start
              />
              Anmelden
            </v-btn>
          </v-form>

        </v-row>
      </v-responsive>
    </v-container>
  </v-card>
</template>

<script setup>
import {ref, defineEmits, inject} from "vue";
import {useAuth} from "@/plugins/auth";

let password = ref("")
let email = ref("")
const auth = useAuth()
const emit = defineEmits(['authed'])
let loading = ref(false)
const keep_login = ref(false)
const cookies = inject("$cookies")

async function signin() {
  loading.value = true
  await auth.login(email.value, password.value)
  if (keep_login.value) {
    cookies.set("auth", auth)
  }
  emit('authed')
}
</script>
