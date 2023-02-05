<template>
  <div v-if="supported">
    <v-container class="fill-height">

      <v-responsive class="fill-height">
        <div :class="fonthelper.get_header_size()">Spielwiese</div>
        <div v-if="loaded">
          <v-alert type="warning" v-if="questions.length === 0">In dieser Kategorie stehen derzeit keine Fragen zur
            Verfügung.
          </v-alert>
          <Question v-else v-if="loaded && displayed" :playground="false" :question="questions[question]"
                    @next="next()"/>
        </div>
        <loading-spinner v-else></loading-spinner>
      </v-responsive>
    </v-container>
  </div>
  <not-found v-else/>

</template>

<script setup>
import {useRoute} from "vue-router";
import Question from "@/components/Practice/PracticeQuestion.vue";
import NotFound from "@/views/NotFound.vue";
import LoadingSpinner from "@/components/Utils/LoadingSpinner.vue";
import {onMounted, reactive, ref} from "vue";
import playground from "@/services/playground";
import {useAuth} from "@/plugins/auth";
import fonthelper from "@/utils/fonthelper";

const auth = useAuth()
const loaded = ref(false)
const supported = ref(true)
const route = useRoute()
let questions = reactive([])
const question = ref(0)
let displayed = ref(true)

onMounted(async () => {
  if (!['NEW_QUESTIONS', 'WITH_VIDEO', 'TRAFFIC_SIGNS', 'RIGHT_OF_WAY', 'FREE_TEXT', 'WITH_FORMULA'].includes(route.params.categoryName)) {
    supported.value = false
  } else {
    questions = (await playground.get_questions_by_category(auth.token, route.params.categoryName)).data
    loaded.value = true
  }
})

function next() {
  question.value++
}
</script>

<style scoped>

</style>