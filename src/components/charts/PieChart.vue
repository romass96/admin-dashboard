<template>
  <div class="col-xl-6 col-lg-6">
    <div class="card shadow mb-4">
      <div class="card-header py-3 d-flex flex-row align-items-center justify-content-between">
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
import { Pie } from 'vue-chartjs'

export default {
  extends: Pie,
  props: {
    title: String,
    chartData: Object
  },
  watch: {
    chartData: function (newValue) {
      this.initChart(newValue);
    }
  },
  mounted() {
    this.initChart(this.chartData);
  },
  methods: {
    initChart(chartData) {
      this.renderChart(chartData, {
        responsive: true,
        maintainAspectRatio: false
      });
    }
  }
}
</script>
