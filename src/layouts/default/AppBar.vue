<!--
  - Copyright (c) 2023 KaratekHD. All rights reserverd.
  - Use of this source code is governed by a BSD-style license that can be
  - found in the LICENSE file.
  - This project is not affiliated with drive.buzz or Fahrschulcockpit.
  -->

<template>
  <v-app-bar flat>
    <v-btn icon @click="$emit('toggleDrawer')">
      <v-badge
          color="error"
          dot v-if="props.unread">
        <v-icon icon="mdi-menu"></v-icon>
      </v-badge>
      <v-icon v-else icon="mdi-menu"></v-icon>


    </v-btn>
    <v-app-bar-title to="/">
      OpenBuzz
    </v-app-bar-title>
    <template v-slot:append>

      <!--<v-btn icon @click="$emit('customtheme')">
        <v-icon v-if="theme.global.name.value === 'dark'" icon="mdi-weather-sunny"/>
        <v-icon v-else icon="mdi-weather-night"/>
      </v-btn>-->
    </template>
  </v-app-bar>
</template>

<script setup>
/*import {useTheme} from "vuetify";


const theme = useTheme()*/
const props = defineProps(["unread"])
</script>
