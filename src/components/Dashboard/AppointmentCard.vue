<!--
  - Copyright (c) 2023 KaratekHD. All rights reserverd.
  - Use of this source code is governed by a BSD-style license that can be
  - found in the LICENSE file.
  - This project is not affiliated with drive.buzz or Fahrschulcockpit.
  -->

<template>
    <v-card to="/appointments" v-if="loaded">
        <div v-if="exists">
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
        </div>
        <!--
        <div v-else>
            <v-card-title>Dein nächster Termin</v-card-title>
            <v-card-text>
                <div style="color: orange" class="text-h4">
                Keine anstehenden Termine.
            </div>
            </v-card-text>
        </div>-->

    </v-card>
    <v-card v-else>
        <v-card-title>Dein nächster Termin</v-card-title>
        <spinner/>
    </v-card>
</template>

<script setup>
import {useAuth} from "@/plugins/auth";
import {onMounted, ref} from "vue";
import appointmentHelper from "@/services/appointments";
import Spinner from "@/components/Utils/LoadingSpinner.vue";

let title = ref("")
let exists = ref(true)
let date = ref("")
let time = ref("")
let duration = ref(0)
const auth = useAuth()
let loaded = ref(false)

async function refresh() {
    loaded.value = false
    const data = await appointmentHelper.getEvents(auth.token)
    data.up.sort((a, b) => {
      const date1 = new Date(a.date);
      const date2 = new Date(b.date);

      return date1 - date2;
    })
    const next = data.up[0]
    if (next === undefined) {
        exists.value = false
        loaded.value = true
        return
    }
    title.value = next.name
    date.value = Intl.DateTimeFormat('de-DE', {dateStyle: 'long'}).format(new Date(next.date))
    time.value = next.time
    duration.value = next.duration
    loaded.value = true
}

onMounted(async () => {
    await refresh()
})
</script>