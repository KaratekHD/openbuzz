<!--
  - Copyright (c) 2023 KaratekHD. All rights reserverd.
  - Use of this source code is governed by a BSD-style license that can be
  - found in the LICENSE file.
  - This project is not affiliated with drive.buzz or Fahrschulcockpit.
  -->

<template>
  <div>
    <v-container class="fill-height" v-if="!submited">
      <div :class="fonthelper.get_header_size()">Vorprüfung</div>

      <v-responsive class="fill-height">

        <QuestionContainer @submit="submit" v-if="loaded" :questions="questions"/>
        <spinner v-else/>

      </v-responsive>

    </v-container>
    <v-container v-else class="fill-height">
      <div class="text-h2">Prüfungsergebnisse</div>

      <v-responsive class="fill-height">
        <exam-results :success="success" :questions="questions" :answers="answers"/>
      </v-responsive>

    </v-container>
  </div>


</template>

<script setup>
import {onMounted, reactive, ref} from "vue";
import examHelper from "@/services/exmas"
import QuestionContainer from "@/components/Exams/QuestionContainer.vue";
import ExamResults from "@/components/Exams/ExamResults.vue";
import {useAuth} from "@/plugins/auth";
import Spinner from "@/components/Utils/LoadingSpinner.vue";
import fonthelper from "@/utils/fonthelper";

let loaded = ref(false)
let questions = reactive([])
let submited = ref(false)
let answers = reactive({})
let id = 0
let success = ref(0)
const auth = useAuth()

onMounted(async () => {
  const response = await examHelper.getExam()
  questions = response.data.theoryQuestions
  id = response.data.id
  loaded.value = true
})

async function submit(e) {
  answers = e
  const res = await examHelper.submitExam(auth, answers, id)
  success.value = res.data
  submited.value = true

}
</script>