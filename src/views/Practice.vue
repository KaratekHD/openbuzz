<template>
  <v-container class="fill-height">
    <div class="text-h2">Übungsbogen</div>

    <v-responsive class="fill-height">
      <v-alert type="success" v-if="complete" title="Glückwunsch!">Du hast keine offenen Fragen mehr.</v-alert>
      <Question @next="nextQuestion()" v-if="loaded && !complete" :question="question"/>

    </v-responsive>

  </v-container>

</template>

<script setup>
import Question from "@/components/PracticeQuestion.vue";
import {onMounted, reactive, ref} from "vue";
import questions from '@/services/questions'
import {useAuth} from "@/plugins/auth";

const auth = useAuth()
let complete = ref(false)
let loaded = ref(false)
let question = reactive({})
onMounted(async () => {
  try {
    const response = await questions.next()
    console.log(response.data)
    question = response.data
    loaded.value = true
  } catch {
    complete.value = true
  }


})

async function nextQuestion() {
  loaded.value = false
  try {
    const response = await questions.next()
    console.log(response.data)
    question = response.data
    loaded.value = true
  } catch {
    complete.value = true
  }
  loaded.value = true
}
</script>