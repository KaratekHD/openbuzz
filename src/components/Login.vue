<template>
<v-card>
  <v-container class="fill-height">
    <v-responsive class="d-flex align-center text-center fill-height">
      <v-img
        contain
        height="300"
        src="https://go.drive.buzz/img/drivebuzz.cad6c6bb.svg"
      />

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
          <v-btn
            color="primary"
            min-width="228"
            rel="noopener noreferrer"
            size="x-large"
            variant="flat"
            @click="signin()"
          >
            Anmelden
          </v-btn>
        </v-form>

      </v-row>
    </v-responsive>
  </v-container>
</v-card>
</template>

<script setup>
import {ref, defineEmits} from "vue";
import {useAuth} from "@/plugins/auth";

let password = ref("")
let email = ref("")
const auth = useAuth()
const emit = defineEmits(['authed'])
async function signin() {
  await auth.login(email.value, password.value)
  emit('authed')
}
</script>
