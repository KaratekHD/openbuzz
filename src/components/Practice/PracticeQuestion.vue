<!--
  - Copyright (c) 2023 KaratekHD. All rights reserverd.
  - Use of this source code is governed by a BSD-style license that can be
  - found in the LICENSE file.
  - This project is not affiliated with drive.buzz or Fahrschulcockpit.
  -->

<template>
  <v-container>
    <v-row v-if="props.question.questionType === 'MULTIPLE_CHOICE'">
      <v-col v-if="props.question.withPicture" cols="12" md="6">
        <v-img :src="'https://api.fahrschulcockpit.de/theory-questions/' + props.question.id + '/media'"></v-img>
      </v-col>
      <v-col v-if="props.question.withVideo" id="player" cols="12" md="6">
        <video-player :question="props.question" :question_shown="video_played"
                      @played="amount_video_played = amount_video_played + 1"></video-player>
      </v-col>
      <v-col v-if="props.question.withVideo && !video_played" cols="12" md="6">
        <v-alert border color="secondary">Bitte sieh dir den Film an, um dich mit der Situation vertraut zu machen.<br>Der
          Film kann noch <b>{{ 5 - amount_video_played }}</b> Mal angesehen werden.
        </v-alert>
        <br>
        <div class="d-flex justify-center">
          <v-btn color="primary" size="large" @click="video_played = !video_played">Zur Aufgabenstellung</v-btn>
        </div>
        <br>
        <br>
        <v-row>
          <v-spacer/>
          <v-btn v-if="!playground" class="question-button" variant="text" @click="next()">Weiter</v-btn>
        </v-row>
      </v-col>
      <v-col v-else cols="12" md="6">
        <div class="text-h5">{{ props.question.paragraph.name }} - {{ props.question.officialNumber }} - Punkte
          :
          {{ props.question.points }}
        </div>
        <v-alert border color="secondary" icon="mdi-help-circle-outline">{{ props.question.title }}</v-alert>
        {{ props.question.additionalText }}
        <v-form class="answers">
          <table>
            <tr v-for="(answer, index) in props.question.options" v-bind:key="index">
              <td>
                <v-icon v-if="validated" :color="getCheckColor(index)" :icon="getCheckType(index)"
                        class="answer-icon"
                        size=60></v-icon>
              </td>
              <td>
                <v-checkbox v-model="model[index]" :disabled="validated"
                            :label="answer.text" class="answer" color="primary"></v-checkbox>
              </td>
            </tr>
          </table>
        </v-form>
        <v-row>
          <v-spacer/>
          <v-btn :disabled="validated" class="question-button" color="primary"
                 @click="validateMultipleChoiceQuestion()">
            Überprüfen
          </v-btn>
          <v-btn v-if="!playground" class="question-button" variant="text" @click="next()">Weiter</v-btn>
        </v-row>


      </v-col>

    </v-row>
    <v-row v-else-if="props.question.questionType === 'FREE_TEXT'">
      <v-col v-if="props.question.withPicture" cols="12" md="6">
        <v-img :src="'https://api.fahrschulcockpit.de/theory-questions/' + props.question.id + '/media'"></v-img>
      </v-col>
      <v-col v-if="props.question.withVideo" id="player" cols="12" md="6">
        <video-player :question="props.question"></video-player>
      </v-col>
      <v-col cols="12" md="6">
        <div class="text-h5">{{ props.question.paragraph.name }} - {{ props.question.officialNumber }} - Punkte
          :
          {{ props.question.points }}
        </div>
        <v-alert border color="secondary" icon="mdi-help-circle-outline">{{ props.question.title }}</v-alert>
        <v-form class="answers">
          {{ props.question.questionPattern }}
          <v-row class="freeTextInput">
            <v-icon v-if="validated" :color="getFreeTextCheckColor()" :icon="getFreeTextCheckType()" class="answer-icon-freetext"
                    size=60></v-icon>
            <v-text-field v-model="freetextModel" :disabled="validated" label="Antwort:"></v-text-field>
          </v-row>
          <div v-if="validated" class="freeTextInput">Richtige Antwort: {{ props.question.correctAnswer }}
          </div>

        </v-form>
        <v-row class="freeTextInput">
          <v-spacer/>
          <v-btn :disabled="validated" class="question-button" color="primary" @click="validateFreeText()">
            Überprüfen
          </v-btn>
          <v-btn v-if="!playground" class="question-button" variant="text" @click="next()">Weiter</v-btn>
        </v-row>
      </v-col>
    </v-row>
    <v-row v-else>
      <v-alert type=error>Der Aufgabentyp {{ props.question.questionType }} kann von OpenBuzz nicht angezeigt
        werden.
        <v-btn v-if="!playground" class="question-button" @click="next()">Weiter</v-btn>
      </v-alert>

    </v-row>
  </v-container>

</template>
<script setup>
import {onMounted, onUpdated, reactive, ref} from "vue";
import questions from '@/services/questions'
import {useAuth} from "@/plugins/auth";
import VideoPlayer from "@/components/Practice/VideoPlayer.vue";

const emit = defineEmits(['next'])
let validated = ref(false)
let model = reactive([])
const props = defineProps(['question', 'playground'])
let correct_answers = reactive([])
let success = false
const auth = useAuth()
let freetextModel = ref("")
let video_played = ref(false)
let amount_video_played = ref(0)

function clear() {
  validated.value = false
  model = reactive([])
  correct_answers = []
  success = false
  freetextModel.value = ""
  video_played.value = false
  amount_video_played.value = 0

}

onMounted(() => {
  if (props.question.questionType === 'MULTIPLE_CHOICE') {
    for (let i in props.question.options) {
      model[i] = false
    }
  }
})

onUpdated(() => {
  if (props.question.questionType === 'MULTIPLE_CHOICE') {
    for (let i in props.question.options) {
      model[i] = false
    }
  }
})


function validateMultipleChoiceQuestion() {
  correct_answers = []
  const correct = props.question.correctAnswer.split(";")
  let corrects = []
  for (let i in props.question.options) {
    if (correct.includes(String(props.question.options[i].position))) {
      corrects.push(true)
    } else {
      corrects.push(false)
    }
  }
  for (let i in model) {
    if (model[i] === corrects[i]) {
      correct_answers.push(true)
    } else {
      correct_answers.push(false)
    }
  }
  success = !correct_answers.includes(false);
  validated.value = true
}

function getCheckType(i) {
  if (correct_answers[i]) {
    return "mdi-checkbox-marked-circle-outline"
  } else {
    return "mdi-alert-circle-outline"
  }
}

function getCheckColor(i) {
  if (correct_answers[i]) {
    return "green"
  } else {
    return "red"
  }
}

function getFreeTextCheckType(i) {
  if (success) {
    return "mdi-checkbox-marked-circle-outline"
  } else {
    return "mdi-alert-circle-outline"
  }
}

function getFreeTextCheckColor(i) {
  if (success) {
    return "green"
  } else {
    return "red"
  }
}

function validateFreeText() {
  if (props.question.correctAnswer === freetextModel.value) {
    success = true
  } else {
    success = false
  }
  validated.value = true
}

function next() {
  clear()
  if (validated.value) {
    questions.sendResult(auth, props.question, success)
  }

  emit('next')
}
</script>

<style>
.answer {
  font-size: 2.5rem;
}

.answers {
  margin-top: 1rem;
}

.v-label {
  font-size: 1rem;
  margin-left: 1rem;

}

.answer-icon {
  position: relative;
  top: -0.5rem;
  margin-right: 0.3rem;
}

.freeTextInput {
  position: relative;
  top: 1rem;
}

.question-button {
  margin-bottom: 1rem;
}
</style>