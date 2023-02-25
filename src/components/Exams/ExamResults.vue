<!--
  - Copyright (c) 2023 KaratekHD. All rights reserverd.
  - Use of this source code is governed by a BSD-style license that can be
  - found in the LICENSE file.
  - This project is not affiliated with drive.buzz or Fahrschulcockpit.
  -->

<template>
  <div>

    <v-alert type=success v-if="props.success === true">
      <v-alert-title>Prüfung bestanden!</v-alert-title>
    </v-alert>
    <v-alert type=error v-else>
      <v-alert-title>Prüfung nicht bestanden.</v-alert-title>
    </v-alert>
    <br>
    <v-expansion-panels>
      <v-expansion-panel v-for="(question, index) in props.questions" expand-icon="mdi-checkbox-marked-circle-outline">
        <v-expansion-panel-title>
          <template v-slot:actions="">
            <v-icon :color='getSuccessColor(index)' :icon='getSuccess(index)'></v-icon>
          </template>
          <p>
            Frage {{ index + 1 }}: {{ question.officialNumber }}
          </p>
        </v-expansion-panel-title>
        <v-expansion-panel-text>
          <exam-question :question="question" :index="index" :answers="getAnswers(index)"/>
        </v-expansion-panel-text>
      </v-expansion-panel>
    </v-expansion-panels>
<br>
    <v-row>
      <v-spacer /><v-btn color="primary" variant="text">Zur Startseite</v-btn>
<br><p></p>
    </v-row>
  </div>
</template>

<script setup>
import ExamQuestion from "@/components/Exams/ExamQuestion.vue";

const props = defineProps(["questions", "answers", "success"])

function getSuccess(index) {
  const quest = props.answers[index]
  if (quest === undefined) {
    return "mdi-alert-circle-outline"
  } else {
    if (quest.correct) {
      return "mdi-checkbox-marked-circle-outline"
    } else {
      return "mdi-alert-circle-outline"
    }
  }
}

function getSuccessColor(index) {
    const quest = props.answers[index]
  if (quest === undefined) {
    return "error"
  } else {
    if (quest.correct) {
      return "success"
    } else {
      return "error"
    }
  }
}

function getAnswers(index) {
  const question = props.questions[index]
  const answer = props.answers[index]

  if(question.questionType === "MULTIPLE_CHOICE") {
    if(answer === undefined) {
    return []
  }
    if(answer.answer === 0) {
      return []
    }
    const ticks = answer.answer.split(";")
    return ticks

  } else {
    // Freetext
    return []
  }
}
</script>