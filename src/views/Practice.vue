<!--
  - Copyright (c) 2023 KaratekHD. All rights reserverd.
  - Use of this source code is governed by a BSD-style license that can be
  - found in the LICENSE file.
  - This project is not affiliated with drive.buzz or Fahrschulcockpit.
  -->

<template>
  <v-container class="fill-height">
    <div :class="fonthelper.get_header_size()">Übungsbogen</div>

    <v-responsive class="fill-height">
      <v-alert type="success" v-if="complete" title="Glückwunsch!">Du hast keine offenen Fragen mehr.</v-alert>
      <Question :playground="false" @next="nextQuestion()" v-if="loaded && !complete" :question="question"/>
      <spinner v-if="!loaded"/>

    </v-responsive>

  </v-container>

</template>

<script setup>
import Question from "@/components/Practice/PracticeQuestion.vue";
import {onMounted, reactive, ref} from "vue";
import questions from '@/services/questions'
import {useAuth} from "@/plugins/auth";
import Spinner from "@/components/Utils/LoadingSpinner.vue";
import fonthelper from "@/utils/fonthelper";

const auth = useAuth()
let complete = ref(false)
let loaded = ref(false)
let question = reactive({})
onMounted(async () => {
  try {
    const response = await questions.next()
    console.log(response.data)
    question = response.data
  } catch {
    complete.value = true
  }
  loaded.value = true


})

async function nextQuestion() {
  loaded.value = false
  try {
    const response = await questions.next()
    console.log(response.data)
    question = response.data
  } catch {
    complete.value = true
  }
  loaded.value = true
}
</script>