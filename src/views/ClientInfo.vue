<template>
  <div>
    <div class="card shadow mb-4 border-left-primary">
      <div class="card-header py-3">
        <h6 class="m-0 font-weight-bold text-primary">Информация о клиенте</h6>
      </div>
      <div class="card-body">
        <div class="row">
          <div class="col-md-6">
            <label for="firstName" class="font-weight-bold">Имя</label>
          </div>
          <div class="col-md-6">
            <p id="firstName">{{ client.firstName }}</p>
          </div>
        </div>
        <div class="row">
          <div class="col-md-6">
            <label for="lastName" class="font-weight-bold">Фамилия</label>
          </div>
          <div class="col-md-6">
            <p id="lastName">{{ client.lastName }}</p>
          </div>
        </div>
        <div class="row">
          <div class="col-md-6">
            <label for="email" class="font-weight-bold">Email</label>
          </div>
          <div class="col-md-6">
            <p id="email">{{ client.email }}</p>
          </div>
        </div>
        <div class="row">
          <div class="col-md-6">
            <label for="phoneNumber" class="font-weight-bold">Номер телефона</label>
          </div>
          <div class="col-md-6">
            <p id="phoneNumber">{{ client.phoneNumber }}</p>
          </div>
        </div>
        <div class="row">
          <div class="col-md-6">
            <label for="registrationDate" class="font-weight-bold">Дата регистрации</label>
          </div>
          <div class="col-md-6">
            <p id="registrationDate">{{ client.registrationDate }}</p>
          </div>
        </div>
        <div class="row">
          <div class="col-md-6">
            <label for="orderCount" class="font-weight-bold">Количество заказов</label>
          </div>
          <div class="col-md-6">
            <p id="orderCount">{{ orderCount }}</p>
          </div>
        </div>
      </div>
    </div>
    <div class="card shadow mb-4 border-left-primary" v-show="orderTableVisible">
      <div class="card-header py-3">
        <h6 class="m-0 font-weight-bold text-primary">Заказы клиента</h6>
      </div>
      <div class="card-body">
        <DataTable :fields="orderFields" :itemsProvider="ordersProvider" />
      </div>
    </div>
    <div class="row">
      <PieChart v-show="clientProductsByCategories.length"
        :chartData="clientCategoriesChartData"
        :title="'Купленные товары по категориям'"
      />
      <PieChart v-show="clientOrdersByStatuses.length"
        :chartData="clientOrdersChartData"
        :title="'Заказы клиента по статусам'"
      />
    </div>
  </div>
</template>

<script>
import DataTable from "@/components/ApiDataTable";
import PieChart from "@/components/charts/PieChart";
import { ORDER_MAP } from "@/utils/constants";

export default {
  components: {
    DataTable,
    PieChart,
  },
  data: () => ({
    clientId: null,
    orderCount: 0,
    client: {},
    clientOrders: [],
    clientProductsByCategories: [],
    clientOrdersByStatuses: [],
    clientCategoriesChartData: {},
    clientOrdersChartData: {},
    orderFields: [
      {
        key: "id",
        label: "Номер заказа",
        sortable: true,
      },
      {
        key: "totalOrderPrice",
        label: "Сумма заказа",
        sortable: true,
      },
      {
        key: "createdDate",
        label: "Дата и время создания",
        sortable: true,
      },
      {
        key: "status",
        label: "Статус",
        formatter: (value) => {
          return ORDER_MAP[value];
        },
        sortable: false,
      }
    ],
    orderTableVisible: true
  }),
  methods: {
    async ordersProvider(ctx) {
      const filters = {
        pageNumber: ctx.currentPage,
        perPage: ctx.perPage,
        stringForSearch: ctx.filter,
        clientId: this.clientId,
      };

      if (ctx.sortBy.length) {
        filters.sortBy = ctx.sortBy;
        filters.sortDesc = ctx.sortDesc;
      }
      const ordersData = await this.$store.dispatch(
        "fetchOrdersByFilters",
        filters
      );
      this.orderCount = ordersData.totalItems;
      this.orderTableVisible = this.orderCount > 0 || (ctx.filter && ctx.filter.length > 0);
      return ordersData;
    },
    async initClientCategoriesChart() {
      this.clientProductsByCategories = await this.$store.dispatch(
        "fetchClientProductsByCategories",
        this.clientId
      );
      const data = this.clientProductsByCategories;
      this.clientCategoriesChartData = {
        labels: data.map((element) => element.categoryName),
        datasets: [
          {
            data: data.map((element) => element.productCount),
          }
        ]
      };
    },
    async initClientOrdersChart() {
      this.clientOrdersByStatuses = await this.$store.dispatch(
        "fetchClientOrdersForStatuses",
        this.clientId
      );
      const data = this.clientOrdersByStatuses;
      this.clientOrdersChartData = {
        labels: data.map((element) => ORDER_MAP[element.orderStatus]),
        datasets: [
          {
            data: data.map((element) => element.orderCount),
          }
        ]
      };
    },
  },
  async created() {
    this.clientId = this.$route.query.clientId;
    this.client = await this.$store.dispatch("fetchClientById", this.clientId);
    await this.initClientCategoriesChart();
    await this.initClientOrdersChart();
  },
};
</script>

<style>
</style>