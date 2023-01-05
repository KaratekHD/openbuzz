<template>
  <v-container>
    <v-row v-if="props.question.questionType === 'MULTIPLE_CHOICE'">
      <v-col v-if="props.question.withPicture" cols="12" md="6">
        <v-img :src="'https://api.fahrschulcockpit.de/theory-questions/' + props.question.id + '/media'"></v-img>
      </v-col>
      <v-col v-if="props.question.withVideo" id="player" cols="12" md="6">
        <video-player :question="props.question"></video-player>

      </v-col>
      <v-col cols="12" md="6">
        <div class="text-h5">{{ props.question.paragraph.name }} - {{ props.question.officialNumber }} - Punkte :
          {{ props.question.points }}
        </div>
        <v-alert border icon="mdi-help-circle-outline" color="secondary">{{ props.question.title }}</v-alert>
        {{ props.question.additionalText }}
        <v-form class="answers">
          <table>
            <tr v-for="(answer, index) in props.question.options" v-bind:key="index">
              <td>
                <v-icon v-if="validated" :color="getCheckColor(index)" size=60 :icon="getCheckType(index)"
                        class="answer-icon"></v-icon>
              </td>
              <td>
                <v-checkbox :disabled="validated" v-model="model[index]"
                            color="primary" class="answer" :label="answer.text"></v-checkbox>
              </td>
            </tr>
          </table>
        </v-form>


      </v-col>

    </v-row>
    <v-row v-else-if="props.question.questionType === 'FREE_TEXT'">
      <v-col cols="12" md="6">
        <div class="text-h5">{{ props.question.paragraph.name }} - {{ props.question.officialNumber }} - Punkte :
          {{ props.question.points }}
        </div>
        <v-alert border icon="mdi-help-circle-outline" color="secondary">{{ props.question.title }}</v-alert>
          <br v-if="props.answers !== undefined">
      <v-alert v-if="props.answers !== undefined" border color="warning">Aufgrund technischer Limitierungen kann nur die richtige Antwort angezeigt werden, welche nicht zwingend mit der eingegebenen Lösung übereinstimmt.</v-alert>

        <v-form class="answers">
          {{ props.question.questionPattern }}
          <v-row class="freeTextInput" v-if="props.answers === undefined">
            <v-icon v-if="validated" :color="getFreeTextCheckColor()" size=60 :icon="getFreeTextCheckType()"
                    class="answer-icon-freetext"></v-icon>
            <v-text-field :disabled="validated" v-model="freetextModel" label="Antwort:"></v-text-field>
          </v-row>
          <div v-if="validated" class="freeTextInput">Richtige Antwort: {{ props.question.correctAnswer }}</div>

        </v-form>
      </v-col>
    </v-row>
    <v-row v-else>
      <v-alert type=error>Der Aufgabentyp {{ props.question.questionType }} kann von OpenBuzz nicht angezeigt werden.
      </v-alert>

    </v-row>
    <v-row>
      <v-spacer/>
      <v-btn-group v-if="showButtons">

        <v-btn @click="submit()" color="red">Abgabe</v-btn>
        <v-btn @click="back()" color="yellow">Zurück</v-btn>
        <v-btn @click="next()" color="green">Weiter</v-btn>
      </v-btn-group>

    </v-row>
  </v-container>

</template>
<script setup>
import {onMounted, reactive, ref} from "vue";
import {useAuth} from "@/plugins/auth";
import VideoPlayer from "@/components/VideoPlayer.vue";

const emit = defineEmits(['next', 'back', 'submit'])
let validated = ref(false)
const model = reactive([])
const props = defineProps(['question', 'index', 'answers'])
let correct_answers = []
let success = false
const auth = useAuth()
let freetextModel = ref("")
let showButtons = ref(true)


onMounted(() => {
  if (props.question.questionType === 'MULTIPLE_CHOICE') {
    for (let i in props.question.options) {
      model[i] = false
    }
  }
  console.log(props)
  if (props.answers) {
    console.debug("Test")
    showButtons.value = false
    console.debug(props.answers)
    for (let i in props.answers) {
      model[props.answers[i] - 1] = true
      console.log(model)
    }
    validateMultipleChoiceQuestion()
    validated.value = true
  }

})


function validateMultipleChoiceQuestion() {
  correct_answers = []
  // Alle richtigen Antworten
  const correct = props.question.correctAnswer.split(";")
  // Eine Liste, die entweder true oder false für jede Antwort enthält
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

function getFreeTextCheckType() {
  if (success) {
    return "mdi-checkbox-marked-circle-outline"
  } else {
    return "mdi-alert-circle-outline"
  }
}

function getFreeTextCheckColor() {
  if (success) {
    return "green"
  } else {
    return "red"
  }
}

function validateFreeText() {
  success = props.question.correctAnswer === freetextModel.value;
}

function getAnswers(type) {
  if (type === 'MULTIPLE_CHOICE') {
    let res = ""
    console.debug(model)
    for (let i in model) {
      if (model[i]) {
        console.debug(model[i])
        if (res === "") {
          res = String(Number(i) + 1)
        } else {
          res = res + ";" + String(Number(i) + 1)
        }
      }
    }
    console.debug(res)
    if (res === "") {
      return null
    }
    return res
  } else {
    console.debug(freetextModel.value)
    if (freetextModel.value === "") {
      return null
    }
    return 0
  }
}

function buildResponse() {
  const type = props.question.questionType
  if (type === 'MULTIPLE_CHOICE') {
    validateMultipleChoiceQuestion()
  } else {
    validateFreeText()
  }
  const res = {
    "studentEducationId": String(auth.student.education),
    "theoryQuestionId": props.question.id,
    "correct": success,
    "answer": getAnswers(type)
  }
  console.log(res)
  return res
}

function next() {
  emit("next", {index: props.index, res: buildResponse()})
}

function back() {
  emit("back", {index: props.index, res: buildResponse()})
}

function submit() {
  emit("submit", {index: props.index, res: buildResponse()})
}
</script>

<style>
.answer {
  font-size: 2.5rem;
}

.v-selection-control__input {
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