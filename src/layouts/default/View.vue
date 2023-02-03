<template>
  <v-main>
    <router-view/>
    <karatek-footer/>
  </v-main>
</template>

<script setup>
//
import KaratekFooter from "@/components/Utils/AppFooter.vue";
import {inject, onMounted} from "vue";
import {useAuth} from "@/plugins/auth";
import router from "@/router";

const cookies = inject("$cookies")
const auth = useAuth()

onMounted(async () => {
  if (cookies.get("auth") !== null) {
    const s = await auth.loginCookie(cookies.get("auth"))
    if (s) {
      console.debug(auth)
    } else {

      await router.push("/")
    }
  }
})

</script>
