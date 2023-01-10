<template>
    <v-card>
        <v-card-title>{{ title }}</v-card-title>
        <v-card-subtitle>Dein nächster Termin</v-card-subtitle>
        <v-card-text>
            <v-card variant="outlined">
                <v-card-title style="color: teal;">{{ date }}
                </v-card-title>
                <v-card-subtitle class="subcard-subtitle">Datum</v-card-subtitle>
            </v-card>
            <div v-if="time !== null">
                <br>
                <v-card variant="outlined">
                    <v-card-title style="color: teal;">{{ time }}
                    </v-card-title>
                    <v-card-subtitle class="subcard-subtitle">Uhrzeit</v-card-subtitle>
                </v-card>
            </div>

            <div v-if="duration !== null">
                <br>
                <v-card variant="outlined">
                    <v-card-title style="color: teal;">{{ duration }} Minuten
                    </v-card-title>
                    <v-card-subtitle class="subcard-subtitle">Dauer</v-card-subtitle>
                </v-card>
            </div>
        </v-card-text>
        <v-card-actions>
            <v-spacer/>
            <v-btn @click="refresh" color="primary">Aktualisieren</v-btn>
        </v-card-actions>
    </v-card>
</template>

<script setup>
import {useAuth} from "@/plugins/auth";
import {onMounted, ref} from "vue";
import appointmentHelper from "@/services/appointments";

let title = ref("")
let show = ref(true)
let date = ref("")
let time = ref("")
let duration = ref(0)
const auth = useAuth()

async function refresh() {
    const data = await appointmentHelper.getEvents(auth.token)
    const next = data.up[0]
    if (next === null) {
        show.value = false
    }
    title.value = next.name
    date.value = Intl.DateTimeFormat('de-DE', {dateStyle: 'long'}).format(new Date(next.date))
    time.value = next.time
    duration.value = next.duration
}

onMounted(async () => {
    await refresh()
})
</script>