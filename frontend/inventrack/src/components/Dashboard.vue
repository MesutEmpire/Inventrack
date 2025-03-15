<template>
  <div class="flex flex-col justify-around w-full h-full relative px-4 py-5 gap-y-8 overflow-y-auto">
    <div class="flex flex-wrap w-full justify-center gap-6">
      <div v-for="item in dashboardItems" :key="item.title">
        <div class="flex items-center overflow-hidden rounded-lg border border-gray-200 shadow-md h-16 w-64">
          <div class="h-full w-1/3 flex items-center justify-center" :class="item.colour">
            <h4 class="text-2xl font-mono text-white">{{ item.abbr }}</h4>
          </div>
          <div class="w-2/3 p-2">
            <h4 class="text-2xl font-semibold text-gray-900">{{ item.no }}</h4>
            <div class="text-gray-700">{{ item.title }}</div>
          </div>
        </div>
      </div>
    </div>

    <div class="flex flex-col justify-around w-full h-full relative gap-y-8">
 <h1 class="text-2xl font-bold mb-4">Inventory Charts</h1>
      <div class="flex flex-row gap-y-6 justify-around w-full flex-wrap lg:flex-nowrap">
       <div class="w-full relative bg-white p-4 rounded-lg shadow-md">
         <h2 class="text-lg font-semibold mb-2">Item Quantities</h2>
         <BarChart :chart-data="barChartData" :chart-options="chartOptions" />
       </div>
     <div class="w-full relative bg-white p-4 rounded-lg shadow-md">
       <h2 class="text-lg font-semibold mb-2">Category Distribution</h2>
       <DoughnutChart :chart-data="doughnutChartData" :chart-options="chartOptions" />
     </div>
      </div>


          <!-- Line Chart for Stock Movement -->
          <div class="bg-white p-4 rounded-lg shadow-md">
            <h2 class="text-lg font-semibold mb-2">Stock Movement Over Time</h2>
            <LineChart :chart-data="lineChartData" :chart-options="chartOptions" />
          </div>

    </div>
  </div>
</template>

<script setup>

import {computed, ref, toRaw, watch, watchEffect} from "vue";
import { InventoryStore } from "@/stores/inventoryStore.js";
import Chart from "@/components/Chart.vue";
import BarChart from "@/components/BarChart.vue";
import DoughnutChart from "@/components/DoughnutChart.vue";
import LineChart from "@/components/LineChart.vue";

// Global Chart Options
const chartOptions = ref({
  responsive: true,
  maintainAspectRatio: false,
  plugins: { legend: { display: true } }
});

const store = InventoryStore();

const dashboardItems = computed(() => [
  { title: "Inventory", no: items.value.length, colour: "bg-green-600", abbr: "Inv" },
  { title: "Categories", no: categories.value.length, colour: "bg-orange-600", abbr: "Cat" },
  { title: "Suppliers", no: computed(()=> store.getSuppliers.length), colour: "bg-violet-600", abbr: "Sup" }

]);
const generateColors = (count) => {
  const colors = ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF", "#FF9F40"];

  return Array.from({ length: count }, (_, i) => colors[i] || randomColor());
};

const randomColor = () => {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
};

const barChartData = ref({
  labels: items.value.map(item => item.name),
  datasets: [
    {
      label: "Quantity",
      data: items.value.map(item => item.quantity),
      backgroundColor: generateColors(items.value.length)
    }
  ]
});

const doughnutChartData = ref({
  labels: computed(()=> store.getDoughnutChart).value?.labels,
  datasets: [
    {
      label: "Categories",
      data: computed(()=> store.getDoughnutChart).value?.data,
      backgroundColor: generateColors(computed(()=> store.getDoughnutChart).value?.data?.length)
    }
  ]
});

// Function to generate random colors
const getRandomColor = () => {
  const r = Math.floor(Math.random() * 255);
  const g = Math.floor(Math.random() * 255);
  const b = Math.floor(Math.random() * 255);
  return `rgb(${r},${g},${b})`;
};

const lineChartData = ref({
  labels: computed(() => store.getLineChart?.labels || []),
  datasets: computed(() =>
      store.getLineChart?.datasets?.map((item) => ({
        label: item.label,
        data: item.data,
        borderColor: getRandomColor(),
        backgroundColor: "rgba(0, 0, 0, 0)",
      })) || []
  )
});

watchEffect(()=>store.getLineChart)

</script>

<style scoped>
.grid-cols-2 {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
}
</style>
