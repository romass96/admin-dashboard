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
              <div class="h5 mb-0 font-weight-bold text-gray-800">18</div>
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
    <DateLineChart
        :title="'Посещаемость сайта'"
        :backgroundColor="'#f87979'"
        :timeData="timeData"/>
    <DateLineChart
        :title="'Количество заказов'"
        :backgroundColor="'#36b9cc'"
        :timeData="timeData"/>
    <DateLineChart
        :title="'Количество регистраций пользователей'"
        :backgroundColor="'#1cc88a'"
        :timeData="timeData"/>
  </div>

  <!-- Content Row -->
  <div class="row">

    <PieChart
      :title="'Продажа товаров'"/>

    <PieChart
      :title="'Продажа товаров'"/>

  </div>

</div>
<!-- /.container-fluid -->
</template>

<script>
import DateLineChart from '@/components/charts/DateLineChart'
import PieChart from '@/components/charts/PieChart'

export default {
  components: {
    DateLineChart,
    PieChart
  },
  data: () => ({
    timeData: [
      {
        x: new Date(2020, 0, 1),
        y: 10
      },
      {
        x: new Date(2020, 1, 1),
        y: 25
      },
      {
        x: new Date(2020, 2, 1),
        y: 27
      },
      {
        x: new Date(2020, 2, 15),
        y: 4
      },
      {
        x: new Date(2020, 3, 1),
        y: 38
      },
      {
        x: new Date(2020, 4, 1),
        y: 12
      },
      {
        x: new Date(2020, 4, 12),
        y: 12
      },
      {
        x: new Date(2020, 5, 1),
        y: 18
      },
      {
        x: new Date(2020, 5, 28),
        y: 78
      },
      {
        x: new Date(2020, 6, 1),
        y: 67
      },
      {
        x: new Date(2020, 6, 18),
        y: 67
      },
      {
        x: new Date(2020, 7, 1),
        y: 9
      },
      {
        x: new Date(2020, 8, 1),
        y: 45
      },
      {
        x: new Date(2020, 9, 1),
        y: 10
      }
    ]
  })
}
</script>
