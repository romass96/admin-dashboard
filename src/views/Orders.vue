<template>
  <div class="row">
    <div class="col-md-12">
      <div class="card shadow mb-4">
        <a href="#feedbackFilters" class="d-block card-header py-3 collapsed" data-toggle="collapse" role="button" aria-expanded="true" aria-controls="feedbackFilters">
          <h6 class="m-0 font-weight-bold text-dark">
            <i class="fas fa-filter"></i>
            Фильтры
          </h6>
        </a>
        <div class="collapse show" id="feedbackFilters">
          <div class="card-body">
            <div class="form-row">
              <div class="form-group col-md-6">
                <label for="from-datepicker">Статус заказа</label>
                <b-form-select v-model="orderStatus" :options="orderStatusOptions"/>
              </div>
              <div class="form-group col-md-6">
                <label for="categorySelect">Категория товара</label>
                <select class="form-control custom-select" id="categorySelect" v-model="orderProductCategory">
                  <option selected disabled :value="null">Выберите категорию</option>
                  <option v-for="category in categories" :value="category.id" :key="category.id">
                    {{ category.name }}
                  </option>
                </select>
              </div>
            </div>
            <div class="form-row">
              <div class="form-group col-md-3">
                <label for="from-datepicker">Дата создания с</label>
                <b-form-datepicker
                  id="from-datepicker"
                  v-model="dateFrom"
                  class="mb-2"
                  placeholder="Выберите дату"
                  :date-format-options="{ year: 'numeric', month: 'long', day: 'numeric' }"/>
              </div>
              <div class="form-group col-md-3">
                <label for="to-datepicker">Дата создания по</label>
                <b-form-datepicker
                  id="to-datepicker"
                  v-model="dateTo"
                  class="mb-2"
                  placeholder="Выберите дату"
                  :date-format-options="{ year: 'numeric', month: 'long', day: 'numeric' }"/>
              </div>
              <div class="form-group col-md-3">
                <label for="from-price">Сумма заказа с</label>
                <input type="number" class="form-control" id="from-price" v-model="totalOrderPriceFrom">
              </div>
              <div class="form-group col-md-3">
                <label for="to-price">Сумма заказа по</label>
                <input type="number" class="form-control" id="to-price" v-model="totalOrderPriceTo">
              </div>

            </div>
            <div class="form-row">
              <div class="form-group col-md-4 offset-md-8 d-flex justify-content-between">
                <button class="btn btn-secondary flex-grow-1 mr-1" @click="resetFilters">
                  Сбросить
                </button>
                <button class="btn btn-primary flex-grow-1 ml-1" @click="applyFilters">
                  Применить
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="col-md-12">
      <div class="card shadow mb-4">
        <div class="card-body">
          <DataTable :itemsProvider="itemsProvider" :fields="fields" :busy="isBusy" ref="orderTable">
            <template v-slot:cell(actions)="data">
              <span class="action-bar">
                <router-link
                    tag="button"
                    class="btn btn-circle btn-dark btn-sm m-1"
                    v-b-tooltip.hover title="Детали"
                    :to="{ name: 'orderDetails', query: {orderId: data.item.id}}">
                  <i class="fas fa-info"></i>
                </router-link>
                <router-link
                    tag="button"
                    class="btn btn-circle btn-dark btn-sm m-1"
                    v-b-tooltip.hover title="Изменить"
                    :to="{ name: 'edit-order', query: {orderId: data.item.id}}">
                  <i class="fas fa-pencil-alt"></i>
                </router-link>
                <button class="btn btn-circle btn-danger btn-sm m-1" v-b-tooltip.hover title="Отменить" @click="cancelOrder">
                  <i class="fas fa-ban"></i>
                </button>
              </span>
            </template>
          </DataTable>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import DataTable from '@/components/ApiDataTable'
import { mapGetters } from 'vuex'
import moment from 'moment'
import {ORDER_STATUSES, ORDER_MAP} from '@/utils/constants'

const DATE_PICKER_FORMAT = 'YYYY-MM-DD';
const API_DATE_FORMAT = 'YYYY-MM-DD HH:mm';
import _ from 'lodash'

export default {
  components: {
    DataTable
  },
  data: () => ({
    orders: [],
    fields: [{
      key: 'id',
      label: "Номер заказа",
      sortable: true
    },
    {
      key: 'client',
      label: 'Клиент',
      formatter: (value) => {
        return value.firstName + ' ' + value.lastName;
      },
      sortable: false
    },
    {
      key: 'phoneNumber',
      label: 'Телефон',
      sortable: false
    },
    {
      key: 'totalOrderPrice',
      label: 'Сумма заказа',
      sortable: true
    },
    {
      key: 'createdDate',
      label: 'Дата и время создания',
      sortable: true
    },
    {
      key: 'status',
      label: 'Статус',
      formatter: (value) => {
        return ORDER_MAP[value];
      },
      sortable: false
    },
    {
      key: 'actions',
      label: 'Действия',
      sortable: false
    }],
    isBusy: true,
    orderStatus: null,
    orderStatusOptions: [
      { text: 'Не выбрано', value: null },
      { text: 'В обработке', value: ORDER_STATUSES.PENDING },
      { text: 'Отмененные', value: ORDER_STATUSES.CANCELLED },
      { text: 'Доставленные', value: ORDER_STATUSES.SHIPPED},
      { text: 'Ожидают доставки', value: ORDER_STATUSES.AWAITING_SHIPMENT},
      { text: 'Выполненные', value: ORDER_STATUSES.COMPLETED},
    ],
    categories: [],
    dateFrom: null,
    dateTo: null,
    orderProductCategory: null,
    totalOrderPriceFrom: null,
    totalOrderPriceTo: null,
    stringForSearch: null
  }),
  watch: {
    stringForSearch: function() {
      this.retrieveOrdersWithDelay();
    }
  },
  methods: {
    applyFilters() {
      this.$refs.orderTable.refresh();
    },
    resetFilters() {
        this.orderProductCategory = null;
        this.orderStatus = null;
        this.totalOrderPriceFrom = null;
        this.totalOrderPriceTo = null;
        this.dateTo = null;
        this.dateFrom = null;

        this.$refs.orderTable.refresh();
    },
    cancelOrder() {

    },
    async itemsProvider(ctx) {
      try {
        const filters = {
          pageNumber: ctx.currentPage,
          perPage: ctx.perPage,
          status: this.orderStatus,
          categoryId: this.orderProductCategory,
          fromPrice: this.totalOrderPriceFrom,
          toPrice: this.totalOrderPriceTo,
          stringForSearch: ctx.filter
        };

        const toDate = moment(this.dateTo, DATE_PICKER_FORMAT);
        if (toDate._isValid) {
          filters.toDate = toDate.hour(23).minute(59).format(API_DATE_FORMAT);
        }

        const fromDate = moment(this.dateFrom, DATE_PICKER_FORMAT);
        if (fromDate._isValid) {
          filters.fromDate = fromDate.format(API_DATE_FORMAT);
        }

        if (ctx.sortBy.length) {
          filters.sortBy = ctx.sortBy;
          filters.sortDesc = ctx.sortDesc;
        }
        await this.$store.dispatch('fetchOrdersByFilters', filters);
        return {
          items: this.allOrders,
          totalItems: this.totalOrdersCount
        };
      } catch (error) {
        console.error(error);
        return [];
      }
    }
  },
  computed: {
    ...mapGetters(['allOrders', 'totalOrdersCount', 'allCategories'])
  },
  created: async function() {
    this.retrieveOrdersWithDelay = _.debounce(this.applyFilters, 800);
    await this.$store.dispatch('fetchCategoriesIfTheyAreNotLoaded');
    this.categories = this.allCategories;
  }
}
</script>
