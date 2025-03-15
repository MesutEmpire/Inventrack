<!--<template>-->
<!--  <div class="h-64">-->
<!--    <Bar v-if="chartType === 'bar'" :data="chartData" :options="chartOptions" />-->
<!--    <Pie v-else-if="chartType === 'pie'" :data="chartData" :options="chartOptions" />-->
<!--    <Line v-else-if="chartType === 'line'" :data="chartData" :options="chartOptions" />-->
<!--    <Doughnut v-else-if="chartType === 'doughnut'" :data="chartData" :options="chartOptions" />-->
<!--  </div>-->
<!--</template>-->

<!--<script setup>-->
<!--import {  Pie, Line, Doughnut } from "vue-chartjs";-->
<!--import { Chart, registerables } from "chart.js";-->


<!--import {-->
<!--  Chart as ChartJS,-->
<!--  Title,-->
<!--  Tooltip,-->
<!--  Legend,-->
<!--  BarElement,-->
<!--  CategoryScale,-->
<!--  LinearScale-->
<!--} from 'chart.js'-->
<!--import { Bar } from 'vue-chartjs'-->

<!--ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)-->


<!--defineProps({-->
<!--  chartData: Object,-->
<!--  chartOptions: Object,-->
<!--  chartType: {-->
<!--    type: String,-->
<!--    default: "bar"-->
<!--  }-->
<!--});-->
<!--</script>-->

<template>
  <Bar
      id="my-chart-id"
      :options="chartOptions"
      :data="chartData"
  />
</template>

<script>
import { Bar } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

export default {
  name: 'BarChart',
  components: { Bar },
  data() {
    return {
      chartData: {
        labels: [ 'January', 'February', 'March' ],
        datasets: [ { data: [40, 20, 12] } ]
      },
      chartOptions: {
        responsive: true
      }
    }
  }
}
</script>