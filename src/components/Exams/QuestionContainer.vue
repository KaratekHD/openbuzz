<template>
<div>
  <!--<div v-for="(question, index) in props.questions" :key="index">{{ question}}</div>-->
  <v-window>
    <v-window-item v-for="(question, index) in props.questions" :key="index">
      <v-card>
          <practice-question :question="question" />

      </v-card>
    </v-window-item>
  </v-window>

</div>
</template>

<script setup>

import PracticeQuestion from "@/components/PracticeQuestion.vue";

const props = defineProps(["questions"])
</script>