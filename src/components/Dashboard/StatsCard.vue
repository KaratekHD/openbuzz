<template>
  <v-card>
    <v-card-title>Lernstatus
    </v-card-title>
    <div class="d-flex justify-center">
      <v-progress-circular
        :rotate="360"
        :size="100"
        :width="5"
        :model-value="percentage"
        color="orange"
      > {{ Math.round(percentage) }} %
      </v-progress-circular>
    </div>
    <v-card-text>
      <v-card variant="outlined">
        <v-card-title style="color: red;">{{
            total
          }}
        </v-card-title>
        <v-card-subtitle class="subcard-subtitle">Gesamt</v-card-subtitle>
      </v-card>
      <br>
      <v-card variant="outlined">
        <v-card-title style="color: red;">{{
            statistics.remaining
          }}
        </v-card-title>
        <v-card-subtitle class="subcard-subtitle">Noch offen</v-card-subtitle>
      </v-card>
      <br>
      <v-card variant="outlined">
        <v-card-title style="color: red;">{{
            statistics.readyForExam
          }}
        </v-card-title>
        <v-card-subtitle class="subcard-subtitle">Prüfungsreif</v-card-subtitle>
      </v-card>
      <br>
      <v-card variant="outlined">
        <v-card-title style="color: red;">{{
            Math.round((statistics.incorrectlyAnswered / (statistics.incorrectlyAnswered + statistics.readyForExam)) * 100)
          }} %
        </v-card-title>
        <v-card-subtitle class="subcard-subtitle">Fehlerquote</v-card-subtitle>
      </v-card>
     
    </v-card-text>
    <v-card-actions>
      <v-spacer/>
      <v-btn @click="refresh()" color="primary">Aktualisieren</v-btn>
      <v-btn @click="router.push('/practice')" color="primary">Üben</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script setup>
import stats from '@/services/stats'
import {onMounted, reactive, ref} from "vue";
import {useAuth} from "@/plugins/auth";
import {useRouter} from "vue-router";

let percentage = ref(0)
let total = ref(0)
let statistics = reactive({})
const auth = useAuth()
const router = useRouter()

onMounted(() => {
  stats.answers(auth).then(res => {
    const data = res.data
    statistics = data
    total.value = data.remaining + data.readyForExam + data.incorrectlyAnswered
    percentage.value = (data.readyForExam / total.value) * 100
  })
})

function refresh() {
  console.log(auth)
  stats.answers(auth).then(res => {
    const data = res.data
    statistics = data
    total.value = data.remaining + data.readyForExam + data.incorrectlyAnswered
    percentage.value = (data.readyForExam / total.value) * 100
  })
}
</script>


<style>
.subcard-subtitle {
  position: relative;
  top: -0.5rem;
}
</style>