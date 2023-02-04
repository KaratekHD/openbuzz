<template>
  <v-container class="fill-height">

    <v-responsive class="fill-height">
      <div class="text-h2">Spielwiese</div>
      <div v-if="loaded">
        <v-card>
          <v-card-title>Fragen nach Format</v-card-title>
          <v-card-text>
            <v-card to="/playground/category/NEW_QUESTIONS" variant="outlined">
              <v-card-title style="color: teal;">Neue Fragen ({{
                  stats.NEW_QUESTIONS
                }})
              </v-card-title>
            </v-card>
            <br>
            <v-card to="/playground/category/WITH_VIDEO" variant="outlined">
              <v-card-title style="color: teal;">Videofragen ({{
                  stats.WITH_VIDEO
                }})
              </v-card-title>
            </v-card>
            <br>
            <v-card to="/playground/category/TRAFFIC_SIGNS" variant="outlined">
              <v-card-title style="color: teal;">Verkehrszeichen ({{
                  stats.TRAFFIC_SIGNS
                }})
              </v-card-title>
            </v-card>
            <br>
            <v-card to="/playground/category/RIGHT_OF_WAY" variant="outlined">
              <v-card-title style="color: teal;">Vorfahrt/Vorrang ({{
                  stats.RIGHT_OF_WAY
                }})
              </v-card-title>
            </v-card>
            <br>
            <v-card to="/playground/category/FREE_TEXT" variant="outlined">
              <v-card-title style="color: teal;">Zahlenfragen ({{
                  stats.FREE_TEXT
                }})
              </v-card-title>
            </v-card>
            <br>
            <v-card to="/playground/category/WITH_FORMULA" variant="outlined">
              <v-card-title style="color: teal;">Faustformeln ({{
                  stats.WITH_FORMULA
                }})
              </v-card-title>
            </v-card>
            <br>
          </v-card-text>
        </v-card>
      </div>
      <spinner v-if="!loaded"/>
    </v-responsive>
  </v-container>
</template>

<script setup>
import Spinner from "@/components/Utils/LoadingSpinner.vue";
import {useAuth} from "@/plugins/auth";
import {onMounted, reactive, ref} from "vue";
import playground from "@/services/playground";

const auth = useAuth()
let loaded = ref(false)
let stats = reactive({})

onMounted(async () => {
  stats = (await playground.get_categories(auth.token)).data
  loaded.value = true
})
</script>

<style scoped>

</style>