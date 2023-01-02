<template>
  <div class="videoplayer">
    <video-player class="player" controls :responsive="true" :sources="[{'src': 'https://api.fahrschulcockpit.de/theory-questions/' + props.question.id +  '/media', 'type': 'video/mp4'}]" :poster="'https://api.fahrschulcockpit.de/theory-questions/' + props.question.id +  '/media?thumbnail=START'">

    </video-player>

    <v-btn @click="test()">Test</v-btn>
  </div>
</template>

<script setup>
import { VideoPlayer } from "@videojs-player/vue";
import 'video.js/dist/video-js.css'

const props = defineProps(['question'])
function test() {
  console.log(props)

}

</script>

<style>
.player {
  width: 100%;
  height: 18rem;
}
</style>