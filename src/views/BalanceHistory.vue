<!--
  - Copyright (c) 2023 KaratekHD. All rights reserverd.
  - Use of this source code is governed by a BSD-style license that can be
  - found in the LICENSE file.
  - This project is not affiliated with drive.buzz or Fahrschulcockpit.
  -->

<template>
  <v-container class="fill-height">

    <v-responsive class="fill-height">
      <div :class="fonthelper.get_header_size()">Mein Konto</div>

      <v-card variant="outlined">
        <v-card-title>Kontostand</v-card-title>
        <v-card-text>
          <div :style="'color: ' + color" class="text-h4">
            {{ balance }} €
          </div>
        </v-card-text>
      </v-card>
      <br>
      <div v-if="loaded">
        <v-expansion-panels>

          <v-expansion-panel v-for="(item, index) in payments"
                             :color="getColor(item)"
                             :title="new Intl.DateTimeFormat('de-DE', {dateStyle: 'long'}).format(new Date(item.date)) + ': ' + item.description"
          >
            <v-expansion-panel-text>
              <div>

                <b>Datum: </b>{{
                  new Intl.DateTimeFormat('de-DE', {dateStyle: 'long'}).format(new Date(item.date))
                }}
              </div>
              <div v-if="item.amountToPay !== null">

                <b>Betrag: </b>{{
                  item.amountToPay
                }} €
              </div>
              <div v-else>
                <b>Betrag: </b>{{
                  item.amountPaid
                }} €
              </div>
              <div v-if="item.educationEventType === 'DRIVING_LESSON'">
                <b>Ausbilder: </b>{{
                  item.instructor.firstName
                }} {{ item.instructor.lastName }}
              </div>

            </v-expansion-panel-text>
          </v-expansion-panel>
        </v-expansion-panels>
      </div>
      <spinner v-else/>
    </v-responsive>

  </v-container>
</template>

<script setup>
import {onMounted, reactive, ref} from "vue";
import balanceHelper from "@/services/balance"
import {useAuth} from "@/plugins/auth";
import {useTheme} from "vuetify";
import Spinner from "@/components/Utils/LoadingSpinner.vue";
import fonthelper from "@/utils/fonthelper";

let balance = ref(0)
let color = ref("")
const auth = useAuth()
const theme = useTheme()
let payments = reactive([])
let loaded = ref(false)
onMounted(async () => {
  await refresh()
})

function getColor(item) {
  const type = item.educationEventType
  if (type === "CLASSIC_PAY_PAYMENT") {
    return "success"
  }
  if (type === "DRIVING_LESSON" || type === "PRODUCT_BOOKING") {
    const date = new Date(item.date)
    const now = new Date()
    const diff = now.getTime() - date.getTime()
    if(diff < 0) {
      return "orange"
    }
    return "error"
  }

}

function shouldDisplay(item) {
  return !(item.amountPaid === null && item.amountToPay === null);

}

async function loadBalance() {
  balance.value = (await balanceHelper.getSaldo(auth.token, auth.student.education)).data.saldo
  if (balance.value >= 0) {
    color.value = theme.themes.value[theme.global.name.value].colors.success
  } else {
    color.value = theme.themes.value[theme.global.name.value].colors.error
  }
}

async function loadHistory() {
  const response = await balanceHelper.getPayments(auth.token)
  for (const i in response.data) {
    if (response.data[i].amountPaid !== null || response.data[i].amountToPay !== null) {
      payments.push(response.data[i])
    }
  }
}

async function refresh() {
  loaded.value = false
  await loadBalance()
  await loadHistory()
  loaded.value = true

}
</script>