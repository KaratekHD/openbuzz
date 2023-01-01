<template>
<v-card>
<div class="d-flex justify-center">

</div>
</v-card>
</template>

<script setup>
import stats from '@/services/stats'
import {onMounted} from "vue";

onMounted(() => {
console.log(stats.answers())
})
</script>