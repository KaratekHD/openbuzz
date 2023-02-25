<!--
  - Copyright (c) 2023 KaratekHD. All rights reserverd.
  - Use of this source code is governed by a BSD-style license that can be
  - found in the LICENSE file.
  - This project is not affiliated with drive.buzz or Fahrschulcockpit.
  -->

<template>

  <div>
    <v-dialog :max-width="(mobileRef ? '100%' : '30%')" v-model="submitdialog">
      <v-card>
        <v-card-title>Wirklich abgeben?</v-card-title>
        <v-card-text>
          <v-alert v-if="(props.questions.length - answers.length) !== 0" type="warning">
            <b>{{ props.questions.length - answers.length }}</b> Fragen sind noch unbeantwortet.
          </v-alert>
          <br>
          Nach Abgabe können keine Antworten mehr bearbeitet werden.<br>
          Anschließend erfährst du, ob du die Prüfung bestanden hast oder nicht.
        </v-card-text>
        <v-card-actions>
          <v-spacer/>
          <v-btn color="primary" type="text" @click="submitdialog = false">Abbrechen</v-btn>
          <v-btn color="primary" type="text" @click="sendSubmit()">Abgeben</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-card variant="outlined">
      <v-card-title>Frage: {{ model + 1 }}
      </v-card-title>
      <v-card-text>
        <v-progress-linear :height="12" :model-value="(answers.length / props.questions.length) * 100"
                           color="primary"></v-progress-linear>
      </v-card-text>


    </v-card>
    <v-divider/>
    <br>
    <v-window :touch="{left: null, right: null}" v-model="model">
      <v-window-item v-for="(question, index) in props.questions" :key="index">
        <exam-question @back="back" @next="next" @submit="submit" :question="question" :index="index"/>
        <br>
      </v-window-item>
    </v-window>
    <v-divider/>

  </div>
</template>

<script setup>

import ExamQuestion from "@/components/Exams/ExamQuestion.vue";
import {reactive, ref} from "vue";
import {useDisplay} from "vuetify";

const props = defineProps(["questions"])
let model = ref(0)
let answers = reactive([])
let submitdialog = ref(false)
const emit = defineEmits(["submit"])
const {mobile} = useDisplay()
let mobileRef = ref(mobile)
function next(e) {
  if (e.res.answer !== null) {
    answers[e.index] = e.res
  } else {
    answers.splice(e.index)
  }
  if (model.value === props.questions.length - 1) {
    model.value = 0
  } else {
    model.value = model.value + 1
  }
  console.debug(answers)

}

function back(e) {
  if (e.res.answer !== null) {
    answers[e.index] = e.res
  } else {
    answers.splice(e.index)
  }
  if (model.value === 0) {
    model.value = props.questions.length - 1
  } else {
    model.value = model.value - 1
  }
  console.debug(answers)
}

function submit(e) {
  if (e.res.answer !== null) {
    answers[e.index] = e.res
  } else {
    answers.splice(e.index)
  }
  console.debug(answers)
  submitdialog.value = true
}

function sendSubmit() {
  emit("submit", answers)
}
</script>
