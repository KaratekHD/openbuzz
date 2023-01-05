<template>
  <v-card>
    <v-card-title>Meine Vorprüfungen</v-card-title>
    <v-card-text>
      <h1 style="color: green;">{{ success }} / {{ total }}</h1>
      <v-timeline class="timeline" align="start" side="end">
        <v-timeline-item v-for="exam in exams.slice(0, 3)" :dot-color="getColor(exam)" size="small">
          <span class="text-h6">{{
              new Intl.DateTimeFormat('de-DE', {dateStyle: 'long'}).format(new Date(exam.date))
            }}</span>
          <p>Fehlerpunkte: {{ exam.points }}</p>
        </v-timeline-item>

      </v-timeline>
    </v-card-text>
    <v-card-actions>
      <v-spacer/>
      <v-btn @click="refresh" color="primary" variant="text">Aktualisieren</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script setup>
import {onMounted, reactive, ref} from "vue";
import examHelper from "@/services/exmas"
import {useAuth} from "@/plugins/auth";

let total = ref(0)
let success = ref(0)
const auth = useAuth()
let exams = reactive([])
onMounted(async () => {
  const response = await examHelper.getHistory(auth)
  total.value = response.data.length
  success.value = getSuccess(response.data)
  exams = response.data
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

function getColor(exam) {
  if (exam.successfullyPassed) {
    return "success"
  } else {
    return "error"
  }
}

async function refresh() {
  const response = await examHelper.getHistory(auth)
  total.value = response.data.length
  success.value = getSuccess(response.data)
  exams = response.data
}
</script>

<style>
</style>