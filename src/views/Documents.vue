<!--
  - Copyright (c) 2023 KaratekHD. All rights reserverd.
  - Use of this source code is governed by a BSD-style license that can be
  - found in the LICENSE file.
  - This project is not affiliated with drive.buzz or Fahrschulcockpit.
  -->

<template>
  <v-container class="fill-height">
    <!--
    Wichtig: Bei ABrufen wird das UI nicht aktualisiert, der rote Punkt bleibt, bis die Seite neugeladen wird.
    -->
    <v-responsive class="fill-height">
      <div :class="fonthelper.get_header_size()">Dokumente</div>
      <div v-if="loaded">
        <v-list>
          <div v-for="(item, index) in files">
            <v-list-item
                :href="'https://api.fahrschulcockpit.de/student-documents/student/current/document/' + item.id + '?token=' + auth.token">
              <template v-slot:prepend>
                <v-avatar color="primary" icon="mdi-file" style="margin-right: 1rem;"/>
                <v-spacer/>
              </template>
              <v-list-item-title>{{ item.name }}</v-list-item-title>
              <v-list-item-subtitle>
                {{ Intl.DateTimeFormat('de-DE', {dateStyle: 'long'}).format(new Date(item.createdOn)) }}
              </v-list-item-subtitle>
              <template v-slot:append>
                <v-badge inline v-if="!item.seenByStudent" color="error"/>
              </template>
            </v-list-item>
            <v-divider inset v-if="index !== files.length - 1"/>
          </div>


        </v-list>
      </div>
      <loading-spinner v-else/>
    </v-responsive>
  </v-container>
</template>

<script setup>
import {onMounted, reactive, ref} from "vue";
import LoadingSpinner from "@/components/Utils/LoadingSpinner";
import docs from "@/services/docs";
import {useAuth} from "@/plugins/auth";
import fonthelper from "@/utils/fonthelper";

let loaded = ref(false)
let files = reactive([])
const auth = useAuth()

onMounted(async () => {
  files = await docs.getDocuments(auth.token)
  loaded.value = true
})

</script>

<style scoped>

</style>