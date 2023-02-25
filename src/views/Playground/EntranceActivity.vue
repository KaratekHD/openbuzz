<!--
  - Copyright (c) 2023 KaratekHD. All rights reserverd.
  - Use of this source code is governed by a BSD-style license that can be
  - found in the LICENSE file.
  - This project is not affiliated with drive.buzz or Fahrschulcockpit.
  -->

<template>
  <v-container class="fill-height">

    <v-responsive class="fill-height">
      <div :class="fonthelper.get_header_size()">Spielwiese</div>
      <div v-if="loaded">
        <v-row>
          <v-col cols="12" md="4">
            <v-card>
              <v-card-title>Fragen suchen</v-card-title>
              <v-card-text>
                <v-form>
                  <v-text-field
                      :label="searchmode==='1'?'Suchbegriff':'Amtliche Fragennummer'" prepend-inner-icon="mdi-magnify"
                      :rules="[validateSearch]" v-model="searchtext"
                  ></v-text-field>
                  <v-radio-group mandatory v-model="searchmode">
                    <v-radio color="primary" class="searchmode-selector" style="font-size: 1rem !important;"
                             label="Schlagwort" value="1"></v-radio>
                    <v-radio color="primary" class="searchmode-selector" style="font-size: 1rem !important;"
                             label="Amtliche Nummer" value="2"></v-radio>
                  </v-radio-group>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn :disabled="!(searchtext.length >= 3)" color="primary" @click="search()">Suchen</v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
          <v-col cols="12" md="4">
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
              </v-card-text>
            </v-card>
          </v-col>

        </v-row>

        <br>

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
import {useRouter} from "vue-router";
import fonthelper from "@/utils/fonthelper";

const auth = useAuth()
let loaded = ref(false)
let stats = reactive({})
let searchmode = ref("1")
let searchtext = ref("")
const router = useRouter()
onMounted(async () => {
  stats = (await playground.get_categories(auth.token)).data
  loaded.value = true
})

function validateSearch(value) {
  return value.length >= 3 || 'Min 3 characters'
}

async function search() {
  await router.push({path: "/playground/search", query: {mode: Number(searchmode.value), query: searchtext.value}})
  //const res = (await playground.search_questions(Number(searchmode.value), searchtext.value, auth.token)).data
  //console.debug(res)
}
</script>

<style scoped>

</style>