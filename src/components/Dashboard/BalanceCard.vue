<template>
    <v-card>
        <v-card-title>Kontostand</v-card-title>
        <v-card-text>
            <div :style="'color: ' + color" class="text-h4" color="primary">
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
import authHelper from "@/services/auth"
import {useAuth} from "@/plugins/auth";
import {useTheme} from "vuetify";
let balance = ref(0)
let color = ref("orange")
const auth = useAuth()
const theme = useTheme()


onMounted(async () => {
    await refresh()
})

async function refresh() {
    const response = await authHelper.getEducation(auth.token)
    const data = response.data[0]
    balance.value = data.balancePaid - data.balanceToPay
    if(balance.value > 0) {
        color.value = theme.themes.value[theme.global.name.value].colors.success
    } else {
        color.value = theme.themes.value[theme.global.name.value].colors.error
    }
}
</script>