<!--
  - Copyright (c) 2023 KaratekHD. All rights reserverd.
  - Use of this source code is governed by a BSD-style license that can be
  - found in the LICENSE file.
  - This project is not affiliated with drive.buzz or Fahrschulcockpit.
  -->

<template>
  <div class="videoplayer">
    <video-player class="player" muted @ended="end" :controls="false" :responsive="true"
                  :sources="[{'src': 'https://api.fahrschulcockpit.de/theory-questions/' + props.question.id +  '/media', 'type': 'video/mp4'}]"
                  :poster="'https://api.fahrschulcockpit.de/theory-questions/' + props.question.id +  '/media?thumbnail=START'">
      <template v-slot="{ player, state }">
        <div class="player-custom-controls d-fley justify-center">
          <v-btn style="margin: .5rem" v-if="(!state.playing && amount_played !== 5) && !props.question_shown"
                 color="primary" @click="play(player, state)" icon="mdi-play"></v-btn>
        </div>
      </template>
    </video-player>

  </div>
</template>

<script setup>
import {VideoPlayer} from "@videojs-player/vue";
import 'video.js/dist/video-js.css'

const props = defineProps(['question', 'question_shown'])
let global_player = null
const emit = defineEmits(['played'])
let amount_played = 0

function play(player, state) {
  global_player = player
  emit("played")
  amount_played++
  player.play()
  player.requestFullscreen()

}

function end(player) {
  global_player.exitFullscreen()
}
</script>

<style>
.player {
  width: 100%;
  height: 18rem;
}
</style>