<template>
<!-- Begin Page Content -->
<div class="container-fluid">

  <!-- Page Heading -->
  <div class="d-sm-flex align-items-center justify-content-between mb-4">
    <h1 class="h3 mb-0 text-gray-800">Статистика</h1>
    <a href="#" class="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm">
      <i class="fas fa-download fa-sm text-white-50"></i>
      Сгенерировать отчет
    </a>
  </div>

  <!-- Content Row -->
  <div class="row">

    <!-- Earnings (Monthly) Card Example -->
    <div class="col-xl-3 col-md-6 mb-4">
      <div class="card border-left-primary shadow h-100 py-2">
        <div class="card-body">
          <div class="row no-gutters align-items-center">
            <div class="col mr-2">
              <div class="text-xs font-weight-bold text-primary text-uppercase mb-1">Продано товара (за месяц)</div>
              <div class="h5 mb-0 font-weight-bold text-gray-800">$40,000</div>
            </div>
            <div class="col-auto">
              <i class="fas fa-calendar fa-2x text-gray-300"></i>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Earnings (Monthly) Card Example -->
    <div class="col-xl-3 col-md-6 mb-4">
      <div class="card border-left-success shadow h-100 py-2">
        <div class="card-body">
          <div class="row no-gutters align-items-center">
            <div class="col mr-2">
              <div class="text-xs font-weight-bold text-success text-uppercase mb-1">Чистая прибыль (за месяц)</div>
              <div class="h5 mb-0 font-weight-bold text-gray-800">$215,000</div>
            </div>
            <div class="col-auto">
              <i class="fas fa-dollar-sign fa-2x text-gray-300"></i>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Earnings (Monthly) Card Example -->
    <div class="col-xl-3 col-md-6 mb-4">
      <div class="card border-left-info shadow h-100 py-2">
        <div class="card-body">
          <div class="row no-gutters align-items-center">
            <div class="col mr-2">
              <div class="text-xs font-weight-bold text-info text-uppercase mb-1">Выполнено заказов</div>
              <div class="row no-gutters align-items-center">
                <div class="col-auto">
                  <div class="h5 mb-0 mr-3 font-weight-bold text-gray-800">50%</div>
                </div>
                <div class="col">
                  <div class="progress progress-sm mr-2">
                    <div class="progress-bar bg-info" role="progressbar" style="width: 50%" aria-valuenow="50" aria-valuemin="0" aria-valuemax="100"></div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-auto">
              <i class="fas fa-clipboard-list fa-2x text-gray-300"></i>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Pending Requests Card Example -->
    <div class="col-xl-3 col-md-6 mb-4">
      <div class="card border-left-warning shadow h-100 py-2">
        <div class="card-body">
          <div class="row no-gutters align-items-center">
            <div class="col mr-2">
              <div class="text-xs font-weight-bold text-warning text-uppercase mb-1">Заказов за сегодня</div>
              <div class="h5 mb-0 font-weight-bold text-gray-800">{{ todayOrdersCount }}</div>
            </div>
            <div class="col-auto">
              <i class="fas fa-comments fa-2x text-gray-300"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Content Row -->

  <div class="row">
    <DateLineChart :title="'Посещаемость сайта'" :backgroundColor="'#f87979'" :timeData="clientRegistrationData" />

    <DateLineChart :title="'Количество заказов'" :backgroundColor="'#36b9cc'" :timeData="ordersCountData">
      <template v-slot:additionalControl>
        <b-form-select v-model="ordersCountPeriod" :options="periodOptions"></b-form-select>
      </template>
    </DateLineChart>

    <DateLineChart :title="'Количество регистраций пользователей'" :backgroundColor="'#1cc88a'" :timeData="clientRegistrationData">
      <template v-slot:additionalControl>
        <b-form-select v-model="clientRegistrationsPeriod" :options="periodOptions"></b-form-select>
      </template>
    </DateLineChart>
  </div>

  <!-- Content Row -->
  <div class="row">
    <PieChart :chartData="feedbackChartData" :title="'Продажа товаров'" />
    <PieChart :chartData="feedbackChartData" :title="'Отзывы'" />
  </div>

</div>
<!-- /.container-fluid -->
</template>

<script>
import DateLineChart from '@/components/charts/DateLineChart'
import PieChart from '@/components/charts/PieChart'
import {mapGetters} from 'vuex'
import moment from 'moment'

export default {
  components: {
    DateLineChart,
    PieChart
  },
  data: () => ({
    clientRegistrationData: [],
    feedbackChartData: {},
    ordersCountData: [],
    clientRegistrationsPeriod: '1M',
    ordersCountPeriod: '1M',
    periodOptions: [
      { value: '1W', text: '1 неделя'},
      { value: '1M', text: '1 месяц'},
      { value: '3M', text: '3 месяца'},
      { value: '6M', text: '6 месяцев'},
      { value: '1Y', text: '1 год'},
    ]
  }),
  async mounted() {
    moment.locale('ru');
    await this.initFeedbackChart();
    await this.initRegistrationsChart();
    await this.initOrdersCountChart();
  },
  methods: {
    async initFeedbackChart() {
      await this.$store.dispatch('fetchFeedbacksStatistics');

      this.feedbackChartData = {
        labels: ['Положительные', 'Нормальные', 'Негативные'],
        datasets: [{
          backgroundColor: ["#41B883", "#F6C23E", "#E46651"],
          data: [
            this.positiveFeedbacksCount, this.normalFeedbacksCount, this.negativeFeedbacksCount]
        }]
      };
    },
    async initRegistrationsChart() {
      await this.$store.dispatch('fetchClientRegistrationStatistics', this.clientRegistrationsPeriod);
      this.clientRegistrationData = Object.entries(this.clientRegistrations).map(([registrationDate, clientsCount]) => {
        return {
          x: moment(registrationDate).toDate(),
          y: clientsCount
        };
      });
    },
    async initOrdersCountChart() {
      await this.$store.dispatch('fetchOrderStatistics', this.ordersCountPeriod);
      this.ordersCountData = Object.entries(this.ordersCountStatistics).map(([date, ordersCount]) => {
        return {
          x: moment(date).toDate(),
          y: ordersCount
        };
      });
    }
  },
  computed: {
      ...mapGetters(['negativeFeedbacksCount',
      'positiveFeedbacksCount',
      'normalFeedbacksCount',
      'clientRegistrations',
      'ordersCountStatistics']),
      todayOrdersCount() {
        const dataLength = this.ordersCountData.length;
        return dataLength ? this.ordersCountData[dataLength - 1].y : 0;
      }
  },
  watch: {
      clientRegistrationsPeriod: function() {
        this.initRegistrationsChart();
      },
      ordersCountPeriod: function() {
        this.initOrdersCountChart();
      }
  }
}
</script>
