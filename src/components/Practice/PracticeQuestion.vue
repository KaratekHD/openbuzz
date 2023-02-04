<template>
    <v-container>
        <v-row v-if="props.question.questionType === 'MULTIPLE_CHOICE'">
            <v-col v-if="props.question.withPicture" cols="12" md="6">
                <v-img :src="'https://api.fahrschulcockpit.de/theory-questions/' + props.question.id + '/media'"></v-img>
            </v-col>
            <v-col v-if="props.question.withVideo" id="player" cols="12" md="6">
              <video-player :question="props.question" @played="amount_video_played = amount_video_played + 1" :question_shown="video_played"></video-player>
            </v-col>
          <v-col cols="12" md="6" v-if="props.question.withVideo && !video_played">
            <v-alert border color="secondary">Bitte sieh dir den Film an, um dich mit der Situation vertraut zu machen.<br>Der Film kann noch <b>{{ 5 - amount_video_played }}</b> Mal angesehen werden.</v-alert>
            <br>
            <div class="d-flex justify-center">
              <v-btn size="large" color="primary" @click="video_played = !video_played">Zur Aufgabenstellung</v-btn>
            </div>
          </v-col>
            <v-col v-else cols="12" md="6">
                <div class="text-h5">{{ props.question.paragraph.name }} - {{ props.question.officialNumber }} - Punkte
                    :
                    {{ props.question.points }}
                </div>
                <v-alert border icon="mdi-help-circle-outline" color="secondary">{{ props.question.title }}</v-alert>
                {{ props.question.additionalText }}
                <v-form class="answers">
                    <table>
                        <tr v-for="(answer, index) in props.question.options" v-bind:key="index">
                            <td>
                                <v-icon v-if="validated" :color="getCheckColor(index)" size=60
                                        :icon="getCheckType(index)"
                                        class="answer-icon"></v-icon>
                            </td>
                            <td>
                                <v-checkbox :disabled="validated" v-model="model[index]"
                                            color="primary" class="answer" :label="answer.text"></v-checkbox>
                            </td>
                        </tr>
                    </table>
                </v-form>
                <v-row>
                    <v-spacer/>
                    <v-btn class="question-button" :disabled="validated" @click="validateMultipleChoiceQuestion()"
                           color="primary">
                        Überprüfen
                    </v-btn>
                    <v-btn class="question-button" @click="next()" variant="text">Weiter</v-btn>
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
                <v-alert border icon="mdi-help-circle-outline" color="secondary">{{ props.question.title }}</v-alert>
                <v-form class="answers">
                    {{ props.question.questionPattern}}
                    <v-row class="freeTextInput">
                        <v-icon v-if="validated" :color="getFreeTextCheckColor()" size=60 :icon="getFreeTextCheckType()"
                                class="answer-icon-freetext"></v-icon>
                        <v-text-field :disabled="validated" v-model="freetextModel" label="Antwort:"></v-text-field>
                    </v-row>
                    <div v-if="validated" class="freeTextInput">Richtige Antwort: {{ props.question.correctAnswer }}
                    </div>

                </v-form>
                <v-row class="freeTextInput">
                    <v-spacer/>
                    <v-btn class="question-button" :disabled="validated" @click="validateFreeText()" color="primary">
                        Überprüfen
                    </v-btn>
                    <v-btn class="question-button" @click="next()" variant="text">Weiter</v-btn>
                </v-row>
            </v-col>
        </v-row>
        <v-row v-else>
            <v-alert type=error>Der Aufgabentyp {{ props.question.questionType }} kann von OpenBuzz nicht angezeigt
                werden.
                <v-btn class="question-button" @click="next()">Weiter</v-btn>
            </v-alert>

        </v-row>
    </v-container>

</template>
<script setup>
import {onMounted, reactive, ref} from "vue";
import questions from '@/services/questions'
import {useAuth} from "@/plugins/auth";
import VideoPlayer from "@/components/Practice/VideoPlayer.vue";

const emit = defineEmits(['next'])
let validated = ref(false)
const model = reactive([])
const props = defineProps(['question', 'answer'])
let correct_answers = []
let success = false
const auth = useAuth()
let freetextModel = ref("")
let video_played = ref(false)
let amount_video_played = ref(0)


onMounted(() => {
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
    if (validated.value) {
        questions.sendResult(auth, props.question, success)
    }
    validated.value = false
    model.value = []
    correct_answers = []
    success = false
    emit('next')
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