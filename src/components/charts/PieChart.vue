<template>
  <div class="col-xl-6 col-lg-6">
    <div class="card shadow mb-4">
      <!-- Card Header - Dropdown -->
      <div class="card-header py-3 d-flex flex-row align-items-center justify-content-between">
        <h6 class="m-0 font-weight-bold text-primary">{{ title }}</h6>
      </div>
      <!-- Card Body -->
      <div class="card-body">
        <div class="chart-pie pt-4 pb-2">
          <canvas ref="canvas"></canvas>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Pie } from 'vue-chartjs'

export default {
  extends: Pie,
  props: {
    title: String,
    backgroundColor: String,
    timeData: Array
  },
  mounted() {
    const chartData = {
      labels: [
        "Кальяны",
        "Табак",
        "Уголь",
        "Аксессуары"
      ],
      datasets: [
        {
          backgroundColor: ["#41B883", "#E46651", "#00D8FF", "#F6C23E"],
          data: [1250, 7400, 2100, 200]
        }
      ]
    };
    const chartOptions = {
      responsive: true,
      maintainAspectRatio: false
    };
    this.renderChart(chartData, chartOptions);
  }
}
</script>
