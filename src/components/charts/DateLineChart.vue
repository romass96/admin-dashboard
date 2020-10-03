<template>
  <div class="col-xl-12 col-lg-12">
    <div class="card shadow mb-4">
      <div class="card-header py-3 d-flex flex-row align-items-center justify-content-between">
        <h6 class="m-0 font-weight-bold text-primary col-md-10">{{ title }}</h6>
        <slot name="additionalControl" class="col-md-2"></slot>
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
import { Line } from 'vue-chartjs'

export default {
  extends: Line,
  props: {
    title: String,
    backgroundColor: String,
    timeData: Array
  },
  watch: {
    timeData: function(newValue) {
      this.initChart(newValue);
    }
  },
  mounted() {
    this.initChart(this.timeData);
  },
  methods: {
    initChart(data) {
      const chartData = {
        datasets: [
          {
            backgroundColor: this.backgroundColor,
            data: data
          }
        ]
      };
      const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        legend: {
          display: false
        },
        scales: {
          xAxes: [{
            type: 'time',
            time: {
              unit: 'day'
            }
          }]
        }
      };
      this.renderChart(chartData, chartOptions);
    }
  }
}
</script>
