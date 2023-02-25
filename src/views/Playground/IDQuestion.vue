<!--
  - Copyright (c) 2023 KaratekHD. All rights reserverd.
  - Use of this source code is governed by a BSD-style license that can be
  - found in the LICENSE file.
  - This project is not affiliated with drive.buzz or Fahrschulcockpit.
  -->

<template>
  <div v-if="supported">
    <v-container class="fill-height">

      <v-responsive class="fill-height">
        <div :class="fonthelper.get_header_size()">Spielwiese</div>
        <div v-if="loaded">
          <Question :playground="true" :question="question"/>
        </div>
        <loading-spinner v-else></loading-spinner>
      </v-responsive>
    </v-container>
  </div>
  <not-found v-else/>

</template>

<script setup>
import {useRoute} from "vue-router";
import Question from "@/components/Practice/PracticeQuestion.vue";
import NotFound from "@/views/NotFound.vue";
import LoadingSpinner from "@/components/Utils/LoadingSpinner.vue";
import {onMounted, reactive, ref} from "vue";
import playground from "@/services/playground";
import {useAuth} from "@/plugins/auth";
import fonthelper from "@/utils/fonthelper";

const auth = useAuth()
const loaded = ref(false)
const supported = ref(true)
const route = useRoute()
let question = reactive({})
let displayed = ref(true)

onMounted(async () => {
  const data = await playground.get_question_by_id(route.params.questionID, auth.student.education, auth.token)
  question = data.data
  loaded.value = true
})
</script>

<style scoped>

</style>