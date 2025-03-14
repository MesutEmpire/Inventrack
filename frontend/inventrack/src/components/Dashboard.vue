<!--<template>-->
<!--  <div class="flex items-start justify-center min-h-screen pt-5 min-w-screen">-->
<!--    <div class="flex flex-wrap w-full px-4">-->
<!--      <div v-for="item in store.getDashboardItems" :key="item">-->
<!--        <div class="flex items-center overflow-hidden rounded-lg border border-gray-200 shadow-md h-16 w-64 mx-5">-->
<!--          <div-->
<!--              class="h-full w-1/3 flex items-center justify-center" :class="item.colour">-->

<!--            <h4 class="text-2xl font-mono text-white">{{ item.abbr }}</h4>-->
<!--          </div>-->
<!--          <div class="w-2/3">-->
<!--            <h4 class="text-2xl font-semibold text-gray-900">{{ item.no }}</h4>-->
<!--            <div class="text-gray-900">{{ item.title }}</div>-->
<!--          </div>-->
<!--        </div>-->
<!--      </div>-->
<!--    </div>-->
<!--  </div>-->



<!--</template>-->

<!--<script setup>-->
<!--import {InventoryStore} from '@/stores/inventoryStore.js'-->
<!--const store = InventoryStore()-->

<!--</script>-->
<!--<style scoped>-->

<!--</style>-->


<!--<script setup>-->
<!--import { computed, ref } from "vue";-->
<!--import { InventoryStore } from "@/stores/inventoryStore.js";-->
<!--import Chart from "@/components/Chart.vue";-->

<!--const store = InventoryStore();-->

<!--// Dashboard Items-->
<!--const dashboardItems = computed(() => [-->
<!--  { title: "New Inventory", no: store.getNumberOfItems, colour: "bg-green-600", abbr: "NP" },-->
<!--  { title: "Orders", no: 0, colour: "bg-orange-600", abbr: "OR" }-->
<!--]);-->

<!--// Sample Charts Data (Replace with actual API data)-->
<!--const chartsData = ref([-->
<!--  {-->
<!--    title: "Inventory Distribution",-->
<!--    chartType: "pie",-->
<!--    data: {-->
<!--      labels: ["Electronics", "Clothing", "Food", "Furniture"],-->
<!--      datasets: [-->
<!--        {-->
<!--          label: "Inventory Count",-->
<!--          backgroundColor: ["#ff6384", "#36a2eb", "#ffce56", "#4bc0c0"],-->
<!--          data: [50, 30, 80, 20]-->
<!--        }-->
<!--      ]-->
<!--    },-->
<!--    options: { responsive: true, maintainAspectRatio: false }-->
<!--  },-->
<!--  {-->
<!--    title: "Monthly Orders Trend",-->
<!--    chartType: "line",-->
<!--    data: {-->
<!--      labels: ["Jan", "Feb", "Mar", "Apr", "May"],-->
<!--      datasets: [-->
<!--        {-->
<!--          label: "Orders",-->
<!--          borderColor: "#4bc0c0",-->
<!--          fill: false,-->
<!--          data: [5, 10, 3, 15, 7]-->
<!--        }-->
<!--      ]-->
<!--    },-->
<!--    options: { responsive: true, maintainAspectRatio: false }-->
<!--  },-->
<!--  {-->
<!--    title: "Stock Levels",-->
<!--    chartType: "bar",-->
<!--    data: {-->
<!--      labels: ["Laptops", "Phones", "Tablets", "TVs"],-->
<!--      datasets: [-->
<!--        {-->
<!--          label: "Stock Quantity",-->
<!--          backgroundColor: ["#36a2eb", "#ffce56", "#ff6384", "#4bc0c0"],-->
<!--          data: [100, 75, 50, 25]-->
<!--        }-->
<!--      ]-->
<!--    },-->
<!--    options: { responsive: true, maintainAspectRatio: false }-->
<!--  },-->
<!--  {-->
<!--    title: "Order Fulfillment Status",-->
<!--    chartType: "doughnut",-->
<!--    data: {-->
<!--      labels: ["Pending", "Completed", "Cancelled"],-->
<!--      datasets: [-->
<!--        {-->
<!--          label: "Orders",-->
<!--          backgroundColor: ["#ffce56", "#36a2eb", "#ff6384"],-->
<!--          data: [10, 20, 5]-->
<!--        }-->
<!--      ]-->
<!--    },-->
<!--    options: { responsive: true, maintainAspectRatio: false }-->
<!--  }-->
<!--]);-->
<!--</script>-->


<template>
  <div class="flex flex-col items-center justify-center min-h-screen w-full px-4 py-5">
    <div class="flex flex-wrap w-full justify-center mb-6">
      <div v-for="item in dashboardItems" :key="item.title" class="mx-3">
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

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 w-full max-w-5xl">
      <Chart v-for="(chart, index) in chartsData" :key="index" :title="chart.title" :chartType="chart.chartType" :data="chart.data" :options="chart.options" />
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from "vue";
import { InventoryStore } from "@/stores/inventoryStore.js";
import Chart from "@/components/Chart.vue";

const store = InventoryStore();

const dashboardItems = computed(() => [
  { title: "New Inventory", no: store.getNumberOfItems, colour: "bg-green-600", abbr: "NP" },
  { title: "Orders", no: 0, colour: "bg-orange-600", abbr: "OR" }
]);

const chartsData = ref([
  {
    title: "Inventory Distribution",
    chartType: "pie",
    data: {
      labels: ["Electronics", "Clothing", "Food", "Furniture"],
      datasets: [{
        label: "Inventory Count",
        backgroundColor: ["#ff6384", "#36a2eb", "#ffce56", "#4bc0c0"],
        data: [50, 30, 80, 20]
      }]
    },
    options: { responsive: true, maintainAspectRatio: false }
  },
  {
    title: "Monthly Orders Trend",
    chartType: "line",
    data: {
      labels: ["Jan", "Feb", "Mar", "Apr", "May"],
      datasets: [{
        label: "Orders",
        borderColor: "#4bc0c0",
        fill: false,
        data: [5, 10, 3, 15, 7]
      }]
    },
    options: { responsive: true, maintainAspectRatio: false }
  },
  {
    title: "Stock Levels",
    chartType: "bar",
    data: {
      labels: ["Laptops", "Phones", "Tablets", "TVs"],
      datasets: [{
        label: "Stock Quantity",
        backgroundColor: ["#36a2eb", "#ffce56", "#ff6384", "#4bc0c0"],
        data: [100, 75, 50, 25]
      }]
    },
    options: { responsive: true, maintainAspectRatio: false }
  },
  {
    title: "Order Fulfillment Status",
    chartType: "doughnut",
    data: {
      labels: ["Pending", "Completed", "Cancelled"],
      datasets: [{
        label: "Orders",
        backgroundColor: ["#ffce56", "#36a2eb", "#ff6384"],
        data: [10, 20, 5]
      }]
    },
    options: { responsive: true, maintainAspectRatio: false }
  }
]);

console.log(chartsData)
</script>

<style scoped>
.grid-cols-2 {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
}
</style>
