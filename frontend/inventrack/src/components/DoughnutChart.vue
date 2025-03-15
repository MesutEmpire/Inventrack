<template>
  <div class="chart-container">
    <Doughnut v-if="chartData" :data="chartData" :options="chartOptions" />
  </div>
</template>

<script setup lang="ts">
import { defineProps } from "vue";
import { Doughnut } from "vue-chartjs";

defineProps({
  chartData: Object,
  chartOptions: Object
});
</script>

<style scoped>
.chart-container {
  height: 300px;
}
</style>
