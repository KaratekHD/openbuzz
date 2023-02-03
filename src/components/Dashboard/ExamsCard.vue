<template>
    <v-card to="/exam" v-if="loaded">
        <v-card-title>Vorprüfungen</v-card-title>
        <v-card-text>
            <div class="text-h4" style="color: green;">{{ success }} / {{ total }}</div>
            <v-timeline class="timeline" align="start" side="end">
                <v-timeline-item v-for="exam in exams.slice(0, 4)" :dot-color="getColor(exam)" size="small">
          <span class="text-h6">{{
                  new Intl.DateTimeFormat('de-DE', {dateStyle: 'long'}).format(new Date(exam.date))
              }}</span>
                    <p>Fehlerpunkte: {{ exam.points }}</p>
                </v-timeline-item>

            </v-timeline>
        </v-card-text>
    </v-card>
    <v-card v-else>
        <v-card-title>Vorprüfungen</v-card-title>
        <spinner/>
    </v-card>
</template>

<script setup>
import {onMounted, reactive, ref} from "vue";
import examHelper from "@/services/exmas"
import {useAuth} from "@/plugins/auth";
import Spinner from "@/components/spinner.vue";

let total = ref(0)
let success = ref(0)
const auth = useAuth()
let exams = reactive([])
let loaded = ref(false)

onMounted(async () => {
    await refresh()
})

function getSuccess(data) {
    let number = 0
    for (let i in data) {
        if (data[i].successfullyPassed) {
            number++
        }
    }
    return number
}

function getColor(exam) {
    if (exam.successfullyPassed) {
        return "success"
    } else {
        return "error"
    }
}

async function refresh() {
    loaded.value = false
    const response = await examHelper.getHistory(auth)
    total.value = response.data.length
    success.value = getSuccess(response.data)
    exams = response.data
    loaded.value = true
}
</script>

<style>
</style>