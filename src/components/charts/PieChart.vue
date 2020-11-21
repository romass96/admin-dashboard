<template>
  <div class="col-xl-6 col-lg-6">
    <div class="card shadow mb-4">
      <div
        class="card-header py-3 d-flex flex-row align-items-center justify-content-between"
      >
        <h6 class="m-0 font-weight-bold text-primary">{{ title }}</h6>
      </div>
      <div class="card-body">
        <div class="chart-pie pt-4 pb-2">
          <canvas ref="canvas"></canvas>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Pie } from "vue-chartjs";

export default {
  extends: Pie,
  props: {
    title: String,
    chartData: Object,
  },
  watch: {
    chartData: function (newValue) {
      this.initChart(newValue);
    },
  },
  mounted() {
    this.initChart(this.chartData);
  },
  methods: {
    initChart(chartData) {
      if (chartData.datasets) {
        const datasetsElement = chartData.datasets[0];
        if (datasetsElement.data && !datasetsElement.backgroundColor) {
          datasetsElement.backgroundColor = this.generateRandomColors(chartData.datasets[0].data.length);
        }
      }
      this.renderChart(chartData, {
        responsive: true,
        maintainAspectRatio: false,
      });
    },
    generateRandomColors(colorCount) {
      const colors = [];
      const characters = "ABCDEF0123456789";
      for (let i = 1; i < colorCount; i++) {
        let color = "#";
        for (let j = 0; j < 6; j++) {
          color += characters.charAt(
            Math.floor(Math.random() * characters.length)
          );
        }
        colors.push(color);
      }
      return colors;
    },
  },
};
</script>
