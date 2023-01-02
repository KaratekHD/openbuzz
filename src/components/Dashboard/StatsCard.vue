<template>
  <v-card @click="emit('click')">
  <v-card-title>Lernstatus</v-card-title>
    <div class="d-flex justify-center">
      <v-progress-circular
        :rotate="360"
        :size="100"
        :width="5"
        :model-value="percentage"
        color="primary"
      > {{ Math.round(percentage) }} %
      </v-progress-circular>
    </div>
    <v-card-text>
        <b>Gesamt:</b> {{total}}<br>
        <b>Noch offen:</b> {{statistics.remaining}}<br>
        <b>Falsch: </b> {{statistics.incorrectlyAnswered}}<br>
        <b>Prüfungsreif: </b> {{statistics.readyForExam}}
    </v-card-text>
  </v-card>
</template>

<script setup>
import stats from '@/services/stats'
import {onMounted, reactive, ref} from "vue";

let percentage = ref(0)
let total = ref(0)
let statistics = reactive({})
const emit = defineEmits(['click'])

onMounted(() => {
  stats.answers().then(res => {
    const data = res.data
    statistics = data
    total.value = data.remaining + data.readyForExam + data.incorrectlyAnswered
    percentage.value = (data.readyForExam / total.value) * 100
  })
})
</script>

