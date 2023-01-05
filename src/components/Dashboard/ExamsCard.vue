<template>
  <v-card>
    <v-card-title>Meine Vorprüfungen</v-card-title>
    <v-card-text>
      <h1 style="color: green;">{{ success }} / {{ total }}</h1>
      <v-timeline align="start">
        <v-timeline-item left dot-color="success" size="small" side="end" align="start">
          Test
        </v-timeline-item>
      </v-timeline>
    </v-card-text>
  </v-card>
</template>

<script setup>
import {onMounted, ref} from "vue";
import examHelper from "@/services/exmas"
import {useAuth} from "@/plugins/auth";

let total = ref(0)
let success = ref(0)
const auth = useAuth()

onMounted(async () => {
  const response = await examHelper.getHistory(auth)
  total.value = response.data.length
  success.value = getSuccess(response.data)
})

function getSuccess(data) {
  let number = 0
  for (let i in data) {
    if (data[i].successfullyPassed) {
      number++
    }
  }
  return number
}
</script>