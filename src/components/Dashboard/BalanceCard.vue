<!--
  - Copyright (c) 2023 KaratekHD. All rights reserverd.
  - Use of this source code is governed by a BSD-style license that can be
  - found in the LICENSE file.
  - This project is not affiliated with drive.buzz or Fahrschulcockpit.
  -->

<template>
  <v-card v-if="loaded" to="/balance">
    <v-card-title>Kontostand</v-card-title>
    <v-card-text>
      <div :style="'color: ' + color" class="text-h4">
        {{ balance }} €
      </div>
    </v-card-text>
  </v-card>
  <v-card v-else>
    <v-card-title>Kontostand</v-card-title>
    <spinner/>
  </v-card>
</template>

<script setup>
import {onMounted, ref} from "vue";
import balanceHelper from "@/services/balance"
import {useAuth} from "@/plugins/auth";
import {useTheme} from "vuetify";
import Spinner from "@/components/Utils/LoadingSpinner.vue";

let balance = ref(0)
let color = ref("")
const auth = useAuth()
const theme = useTheme()
let loaded = ref(false)


onMounted(async () => {
  await refresh()
})

async function refresh() {
  loaded.value = false
  balance.value = (await balanceHelper.getSaldo(auth.token, auth.student.education)).data.saldo
  if (balance.value >= 0) {
    color.value = theme.themes.value[theme.global.name.value].colors.success
  } else {
    color.value = theme.themes.value[theme.global.name.value].colors.error
  }
  loaded.value = true
}
</script>