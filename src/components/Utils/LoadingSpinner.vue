<!--
  - Copyright (c) 2023 KaratekHD. All rights reserverd.
  - Use of this source code is governed by a BSD-style license that can be
  - found in the LICENSE file.
  - This project is not affiliated with drive.buzz or Fahrschulcockpit.
  -->

<template>
    <v-container class="d-flex justify-center align-center pa-2 loader">
        <v-container>
            <v-col class="d-flex justify-center pa-2">
                <v-row class="d-flex justify-center pa-2">
                    <v-progress-circular
                            :size="50"
                            color="primary"
                            indeterminate
                    ></v-progress-circular>
                </v-row>
            </v-col>
            <v-col class="d-flex justify-center pa-2">
                <v-row class="d-flex justify-center pa-2">
                    <span class="text-body-1">Bitte warten...</span>
                </v-row>
            </v-col>
        </v-container>
    </v-container>
</template>
<script setup>
</script>

<style>
.loader {
    height: 100%;
}
</style>