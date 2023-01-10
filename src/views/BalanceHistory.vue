<template>
  <v-container class="fill-height">

    <v-responsive class="fill-height">
      <div class="text-h2">Mein Konto</div>

      <v-card variant="outlined">
        <v-card-title>Kontostand</v-card-title>
        <v-card-text>
          <div :style="'color: ' + color" class="text-h4">
            {{ balance }} €
          </div>
        </v-card-text>
      </v-card>
      <br>
      <v-container v-if="loaded">
        <v-expansion-panels>

          <v-expansion-panel v-for="(item, index) in payments"
                             :color="getColor(item)"
                             :title="new Intl.DateTimeFormat('de-DE', {dateStyle: 'long'}).format(new Date(item.date)) + ': ' + item.description">
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
      </v-container>
    </v-responsive>

  </v-container>
</template>

<script setup>
import {onMounted, reactive, ref} from "vue";
import authHelper from "@/services/auth"
import balanceHelper from "@/services/balance"
import {useAuth} from "@/plugins/auth";
import {useTheme} from "vuetify";

let balance = ref(0)
let color = ref("orange")
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
  if (type === "DRIVING_LESSON") {
    return "error"
  }
  if (type === "PRODUCT_BOOKING") {
    return "orange"
  }
}

async function loadBalance() {
  const response = await authHelper.getEducation(auth.token)
  const data = response.data[0]
  balance.value = data.balancePaid - data.balanceToPay
  if (balance.value > 0) {
    color.value = theme.themes.value[theme.global.name.value].colors.success
  } else {
    color.value = theme.themes.value[theme.global.name.value].colors.error
  }
}

async function loadHistory() {
  const response = await balanceHelper.getPayments(auth.token)
  payments = response.data
}

async function refresh() {
  loaded.value = false
  await loadBalance()
  await loadHistory()
  loaded.value = true

}
</script>