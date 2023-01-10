<template>
    <v-card>
        <v-card-title>Kontostand</v-card-title>
        <v-card-text>
            <div :style="'color: ' + color" class="text-h4">
                {{ balance }} €
            </div>
        </v-card-text>
        <v-card-actions>
            <v-spacer/>
            <v-btn @click="refresh" color="primary" variant="text">Aktualisieren</v-btn>
            <v-btn to="/balance" color="primary" variant="text">Details</v-btn>
        </v-card-actions>
    </v-card>
</template>

<script setup>
import {onMounted, ref} from "vue";
import balanceHelper from "@/services/balance"
import {useAuth} from "@/plugins/auth";
import {useTheme} from "vuetify";

let balance = ref(0)
let color = ref("")
const auth = useAuth()
const theme = useTheme()


onMounted(async () => {
    await refresh()
})

async function refresh() {
    balance.value = await balanceHelper.calculateTotal(auth.token)
    if (balance.value >= 0) {
        color.value = theme.themes.value[theme.global.name.value].colors.success
    } else {
        color.value = theme.themes.value[theme.global.name.value].colors.error
    }
}
</script>