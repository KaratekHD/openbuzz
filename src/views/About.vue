<!--
  - Copyright (c) 2023 KaratekHD. All rights reserverd.
  - Use of this source code is governed by a BSD-style license that can be
  - found in the LICENSE file.
  - This project is not affiliated with drive.buzz or Fahrschulcockpit.
  -->

<template>
  <v-container class="fill-height">

    <v-responsive>
      <div :class="fonthelper.get_header_size()" style="margin-top: .3rem">Über OpenBuzz</div>
      <div class="d-flex justify-center">
        <v-img
            contain
            height="200"
            src="@/assets/logo.svg"
        />
      </div>
      <br>
      <div class="d-flex justify-center">
        <v-table>
          <tbody>
          <tr>
            <td class="text-left">Autor</td>
            <td class="text-right"><v-btn variant="text" color="primary" prepend-icon="mdi-open-in-new" href="//karatek.net">KaratekHD</v-btn></td>
          </tr>
          <tr>
            <td class="text-left">Quellcode</td>
            <td class="text-right"><v-btn variant="text" color="primary" prepend-icon="mdi-open-in-new" href="//github.com/KaratekHD/openbuzz">GitHub</v-btn></td>
          </tr>
          <tr>
            <td class="text-left">Lizenz</td>
            <td class="text-right"><v-btn variant="text" color="primary" @click="license = true">BSD 3-Clause License</v-btn></td>
          </tr>
          <tr>
            <td class="text-left">Verwendete Bibliotheken</td>
            <td class="text-right"><v-btn variant="text" color="primary" @click="libsDialog = true">Mehr erfahren</v-btn></td>
          </tr>
          </tbody>

        </v-table>
      </div>
    </v-responsive>
    <v-dialog v-model="license">
      <v-card>
        <v-card-title>
          Lizenzinformationen
        </v-card-title>
        <v-card-text>
          Copyright (c) 2023, KaratekHD<br><br>
          Redistribution and use in source and binary forms, with or without<br>
          modification, are permitted provided that the following conditions are met:<br><br>
          1. Redistributions of source code must retain the above copyright notice, this<br>
          list of conditions and the following disclaimer.<br><br>
          2. Redistributions in binary form must reproduce the above copyright notice,<br>
          this list of conditions and the following disclaimer in the documentation<br>
          and/or other materials provided with the distribution.<br><br>
          3. Neither the name of the copyright holder nor the names of its<br>
          contributors may be used to endorse or promote products derived from<br>
          this software without specific prior written permission.<br><br>
          THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"<br>
          AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE<br>
          IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE<br>
          DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE<br>
          FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL<br>
          DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR<br>
          SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER<br>
          CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY,<br>
          OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE<br>
          OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.<br>
        </v-card-text>
        <v-card-actions><v-spacer /><v-btn variant="text" color="primary" @click="license = false">OK</v-btn></v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="libsDialog">
      <v-card>
        <v-card-title>
          Verwendete Bibliotheken
        </v-card-title>
        <v-card-text>
          <v-alert variant="tonal" type="success" icon="mdi-information">
            OpenBuzz wurde möglich gemacht durch die Arbeit hunderte freiwilliger, die die Bibliotheken geschrieben haben, die in OpenBuzz genutzt werden.
          </v-alert>
          <div>
            <v-list>
              <v-list-item v-for="item in libs.sort(compareByTitle)" :href="item.link">
                <v-list-item-title>{{ item.title }} ({{ item.license }})</v-list-item-title>
                <v-list-item-subtitle>{{ item.description }}</v-list-item-subtitle>
              </v-list-item>
            </v-list>
          </div>
        </v-card-text>
        <v-card-actions><v-spacer /><v-btn variant="text" color="primary" @click="libsDialog = false">OK</v-btn></v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script setup>
import fonthelper from "@/utils/fonthelper";
import {ref} from "vue";
const license = ref(false)
const libsDialog = ref(false)
let libs = [
  {
    title: "Vue.js 3",
    license: "MIT",
    description: "An approachable, performant and versatile framework for building web user interfaces.",
    link: "https://vuejs.org"
  },
  {
    title: "vue-cookies",
    license: "MIT",
    description: "A simple Vue.js plugin for handling browser cookies",
    link: "https://github.com/cmp-cc/vue-cookies"
  },
  {
    title: "Vue Router",
    license: "MIT",
    description: "Expressive, configurable and convenient routing for Vue.js",
    link: "https://router.vuejs.org/"
  },
  {
    title: "Vuetify 3",
    license: "MIT",
    description: "Vuetify is a no design skills required UI Framework with beautifully handcrafted Vue Components.",
    link: "https://next.vuetifyjs.com/en/"
  },
  {
    title: "Web Font Loader",
    license: "Apache-2.0",
    description: "Web Font Loader provides a common interface to loading fonts regardless of the source, then adds a standard set of events you may use to control the loading experience.",
    link: "https://github.com/typekit/webfontloader"
  },
  {
    title: "video.js",
    license: "Apache-2.0",
    description: "Video.js - open source HTML5 video player",
    link: "https://videojs.com"
  },
  {
    title: "videojs-player",
    license: "MIT",
    description: "Video.js player component for Vue(3) and React.",
    link: "https://github.com/surmon-china/videojs-player"
  },
  {
    title: "Webfont - Material Design Icons",
    license: "Apache-2.0",
    description: "Webfont distribution for the Material Design Icons.",
    link: "https://github.com/Templarian/MaterialDesign-Webfont"
  },
  {
    title: "Roboto fontface",
    license: "Apache-2.0",
    description: "A simple package providing the Roboto fontface. The font was created by Christian Robertson.",
    link: "https://github.com/choffmeister/roboto-fontface-bower"
  },
  {
    title: "core-js",
    license: "MIT",
    description: "Standard Library",
    link: "https://github.com/zloirock/core-js"
  },
  {
    title: "axios",
    license: "MIT",
    description: "Promise based HTTP client for the browser and node.js",
    link: "https://axios-http.com/"
  },
  {
    title: "Vite",
    description: "Next Generation Frontend Tooling",
    license: "MIT",
    link: "https://vitejs.dev/"
  },
  {
    title: "Vite Vue Plugins",
    license: "MIT",
    link: "https://github.com/vitejs/vite-plugin-vue"
  },
  {
    title: "eslint",
    license: "MIT",
    description: "An AST-based pattern checker for JavaScript.",
    link: "https://eslint.org/"
  },
  {
    title: "eslint-plugin-vue",
    license: "MIT",
    description: "Official ESLint plugin for Vue.js",
    link: "https://eslint.vuejs.org/"
  },
  {
    title: "sass",
    description: "A pure JavaScript implementation of Sass. Sass makes CSS fun again.",
    license: "MIT",
    link: "https://github.com/sass/dart-sass"
  },
  {
    title: "vite-plugin-pwa",
    description: "Zero-config PWA Framework-agnostic Plugin for Vite",
    license: "MIT",
    link: "https://vite-pwa-org.netlify.app/"
  },
  {
    title: "vite-plugin-vuetify",
    license: "MIT",
    link: "https://www.npmjs.com/package/vite-plugin-vuetify"
  }
]

function compareByTitle(a, b) {
  if(a.title.toLowerCase() < b.title.toLowerCase()) {
    return -1;
  }
  if(a.title.toLowerCase() > b.title.toLowerCase()) {
    return 1;
  }
  return 0;
}

</script>

<style scoped>

</style>