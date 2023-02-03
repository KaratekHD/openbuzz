<template>
    <v-container class="fill-height">

        <v-responsive class="fill-height">
            <div class="text-h2">Termine</div>
            <v-container v-if="loaded">
                <v-list>
                    <div>

                        <div v-if="up.length !== 0">
                            <v-list-subheader>Anstehend</v-list-subheader>
                            <div v-for="(item, index) in up">
                                <v-list-item>
                                    <template v-slot:prepend="{ prependAvatar }">
                                        <v-avatar color="primary" style="margin-right: 1rem;" :icon="getIcon(item)"/>
                                        <v-spacer/>
                                    </template>
                                    <v-list-item-title>{{ item.name }}</v-list-item-title>
                                    <v-list-item-subtitle v-if="item.duration !== null">{{ item.duration }}
                                        Minuten
                                    </v-list-item-subtitle>
                                    <template v-slot:append>
                                    <span v-if="mobileRef">
                                    {{
                                            Intl.DateTimeFormat('de-DE', {dateStyle: 'short'}).format(new Date(item.date))
                                        }}</span>
                                        <span v-else>
                                        {{
                                                Intl.DateTimeFormat('de-DE', {dateStyle: 'long'}).format(new Date(item.date))
                                            }}
                                        </span>
                                        <span style="margin-left: .5rem;" v-if="item.time !== null"> {{
                                                item.time
                                            }}</span>
                                    </template>
                                </v-list-item>
                                <v-divider inset v-if="index + 1 < up.length"/>
                            </div>
                        </div>
                        <div v-if="done.length !== 0">
                            <v-list-subheader>Abgeschlossen</v-list-subheader>
                            <div v-for="(item, index) in done">
                                <v-list-item>
                                    <template v-slot:prepend="{ prependAvatar }">
                                        <v-avatar color="primary" style="margin-right: 1rem;" :icon="getIcon(item)"/>
                                        <v-spacer/>
                                    </template>
                                    <v-list-item-title>{{ item.name }}</v-list-item-title>
                                    <v-list-item-subtitle v-if="item.duration !== null">
                                        {{ item.duration }}
                                        Minuten
                                    </v-list-item-subtitle>
                                    <template v-slot:append>
                                    <span v-if="mobileRef">
                                    {{
                                            Intl.DateTimeFormat('de-DE', {dateStyle: 'short'}).format(new Date(item.date))
                                        }}</span>
                                        <span v-else>
                                        {{
                                                Intl.DateTimeFormat('de-DE', {dateStyle: 'long'}).format(new Date(item.date))
                                            }}
                                        </span>
                                        <span style="margin-left: .5rem;" v-if="item.time !== null"> {{
                                                item.time
                                            }}</span>
                                    </template>
                                </v-list-item>
                                <v-divider inset v-if="index + 1 < done.length"/>
                            </div>

                        </div>

                    </div>


                </v-list>

            </v-container>
            <spinner v-else/>
        </v-responsive>
    </v-container>
</template>

<script setup>
import appointmentHelper from "@/services/appointments";
import {onMounted, reactive, ref} from "vue";
import {useAuth} from "@/plugins/auth";
import Spinner from "@/components/Utils/LoadingSpinner.vue";
import {useDisplay} from "vuetify";

const auth = useAuth()
let loaded = ref(false)
let appointments = reactive([])
let up = reactive([])
let done = reactive([])

const {mobile} = useDisplay()
let mobileRef = ref(mobile)

onMounted(async () => {
    const data = await appointmentHelper.getEvents(auth.token)
    appointments = data.all
    up = data.up
    done = data.done
    loaded.value = true
})

function getIcon(item) {
    if (item.appointmentType === "THEORY_EXAM") {
        return "mdi-school"
    }
    if (item.appointmentType === "DRIVING_LESSON") {
        return "mdi-car"
    }
    if (item.appointmentType === "THEORY_LESSON") {
        return "mdi-book-education-outline"
    }

    return "mdi-calendar"
}
</script>