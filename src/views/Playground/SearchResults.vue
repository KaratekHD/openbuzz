<template>
  <v-container class="fill-height">
    <v-responsive class="fill-height">
      <div class="text-h2">Suchergebnisse</div>
      <div v-if="loaded">
        <div><b>{{ data.total }}</b> Suchergebnisse für <i>{{ route.query.query }}</i>:</div>
        <div>
          <v-container>

            <v-row v-for="(item, index) in data.data">
              <v-responsive>
                <v-card variant="outlined" :to="'/playground/question/' + item.id">
                  <v-card-title>
                    {{ item.officialNumber }}
                  </v-card-title>
                  <v-card-text>
                    {{ item.title }}
                  </v-card-text>

                </v-card>
<br>
              </v-responsive>
            </v-row>
          </v-container>
        </div>
      </div>
      <loading-spinner v-else />
    </v-responsive>
  </v-container>
</template>

<script setup>
import {useRoute} from "vue-router";
import LoadingSpinner from "@/components/Utils/LoadingSpinner.vue";
import {onMounted, reactive, ref} from "vue";
import playground from "@/services/playground";
import {useAuth} from "@/plugins/auth";

const route = useRoute()
const loaded = ref(false)
const auth = useAuth()
let data = reactive({})

onMounted(async () => {
  data = (await playground.search_questions(Number(route.query.mode), route.query.query, auth.token)).data
  loaded.value = true
})
</script>

<style scoped>

</style>