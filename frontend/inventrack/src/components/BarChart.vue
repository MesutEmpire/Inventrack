<template>
  <div class="chart-container">
    <Bar v-if="chartData" :data="chartData" :options="chartOptions" />
  </div>
</template>

<script setup lang="ts">
import { defineProps } from "vue";
import { Bar } from "vue-chartjs";

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
