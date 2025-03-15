<template>
  <div class="chart-container">
    <Line v-if="chartData" :data="chartData" :options="chartOptions" />
  </div>
</template>

<script setup lang="ts">
import { defineProps } from "vue";
import { Line } from "vue-chartjs";

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
