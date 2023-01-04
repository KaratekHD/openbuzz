<template>

  <v-container class="fill-height">
    <div class="text-h2">Vorprüfung</div>

    <v-responsive class="fill-height">
      <QuestionContainer v-if="loaded" :questions="questions"/>

    </v-responsive>

  </v-container>

</template>

<script setup>
import {onMounted, reactive, ref} from "vue";
import examHelper from "@/services/exmas"
import QuestionContainer from "@/components/Exams/QuestionContainer.vue";

let loaded = ref(false)
let questions = reactive([])
onMounted(async () => {
  const response = await examHelper.getExam()
  questions = response.data.theoryQuestions
  console.log(questions)
  loaded.value = true
})
</script>