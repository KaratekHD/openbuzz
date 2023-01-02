<template>
  <v-container class="fill-height">
    <v-responsive class="fill-height">
      <div class="text-h2">Übungsbogen</div>
      <Question @next="nextQuestion()" v-if="loaded" :question="question"/>

    </v-responsive>

  </v-container>

</template>

<script setup>
import Question from "@/components/Question.vue";
import {onMounted, reactive, ref} from "vue";
import questions from '@/services/questions'
import {useAuth} from "@/plugins/auth";

const auth = useAuth()

let loaded = ref(false)
let question = reactive({})
onMounted(async () => {
  const response = await questions.next()
  console.log(response.data)
  question = response.data
  loaded.value = true
})

async function nextQuestion() {
  loaded.value = false
  const response = await questions.nextWithToken(auth)
  console.log(response.data)
  question = response.data
  loaded.value = true
}
</script>