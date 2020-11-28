<template>
  <div class="row">
    <router-link
      class="btn btn-dark btn-circle btn-lg"
      v-b-tooltip.hover
      title="Новый заказ"
      id="add-order-btn"
      tag="button"
      to="/createOrder"
    >
      <i class="fas fa-plus"></i>
    </router-link>
    <div class="col-md-12">
      <div class="card shadow mb-4">
        <a
          href="#feedbackFilters"
          class="d-block card-header py-3 collapsed"
          data-toggle="collapse"
          role="button"
          aria-expanded="true"
          aria-controls="feedbackFilters"
        >
          <h6 class="m-0 font-weight-bold text-dark">
            <i class="fas fa-filter"></i>
            Фильтры
          </h6>
        </a>
        <div class="collapse show" id="feedbackFilters">
          <div class="card-body">
            <div class="form-row">
              <div class="form-group col-md-4">
                <label for="from-datepicker">Статус заказа</label>
                <b-form-select
                  v-model="orderStatus"
                  :options="orderStatusOptions"
                />
              </div>
              <div class="form-group col-md-4">
                <label for="from-datepicker">Статус оплаты</label>
                <b-form-select v-model="paid" :options="paidOptions" />
              </div>
              <div class="form-group col-md-4">
                <label for="categorySelect">Категория товара</label>
                <select
                  class="form-control custom-select"
                  id="categorySelect"
                  v-model="orderProductCategory"
                >
                  <option selected disabled :value="null">
                    Выберите категорию
                  </option>
                  <option
                    v-for="category in categories"
                    :value="category.id"
                    :key="category.id"
                  >
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
                  :date-format-options="{
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  }"
                />
              </div>
              <div class="form-group col-md-3">
                <label for="to-datepicker">Дата создания по</label>
                <b-form-datepicker
                  id="to-datepicker"
                  v-model="dateTo"
                  class="mb-2"
                  placeholder="Выберите дату"
                  :date-format-options="{
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  }"
                />
              </div>
              <div class="form-group col-md-3">
                <label for="from-price">Сумма заказа с</label>
                <input
                  type="number"
                  class="form-control"
                  id="from-price"
                  v-model="totalOrderPriceFrom"
                />
              </div>
              <div class="form-group col-md-3">
                <label for="to-price">Сумма заказа по</label>
                <input
                  type="number"
                  class="form-control"
                  id="to-price"
                  v-model="totalOrderPriceTo"
                />
              </div>
            </div>
            <div class="form-row">
              <div
                class="form-group col-md-4 offset-md-8 d-flex justify-content-between"
              >
                <button
                  class="btn btn-secondary flex-grow-1 mr-1"
                  @click="resetFilters"
                >
                  Сбросить
                </button>
                <button
                  class="btn btn-primary flex-grow-1 ml-1"
                  @click="applyFilters"
                >
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
          <DataTable
            :itemsProvider="itemsProvider"
            :fields="fields"
            ref="orderTable"
          >
            <template v-slot:cell(clientFullName)="data">
              <router-link
                :to="{
                  name: 'client-info',
                  query: { clientId: data.item.clientId },
                }"
              >
                {{ data.item.clientFullName }}
              </router-link>
            </template>
            <template v-slot:cell(actions)="data">
              <span class="table-action-bar">
                <router-link
                  tag="button"
                  class="btn btn-dark btn-sm m-1 table-toolbar-btn"
                  v-b-tooltip.hover
                  title="Детали"
                  :to="{
                    name: 'orderDetails',
                    query: { orderId: data.item.id },
                  }"
                >
                  <i class="fas fa-info"></i>
                </router-link>
                <router-link
                  tag="button"
                  class="btn btn-dark btn-sm m-1 table-toolbar-btn"
                  v-b-tooltip.hover
                  title="Изменить"
                  :to="{ name: 'edit-order', query: { orderId: data.item.id } }"
                >
                  <i class="fas fa-pencil-alt"></i>
                </router-link>
                <button
                  class="btn btn-danger btn-sm m-1 table-toolbar-btn"
                  v-if="canBeCancelled(data.item)"
                  v-b-tooltip.hover
                  title="Отменить"
                  @click="showModalForCancel(data.item.id)"
                >
                  <i class="fas fa-ban"></i>
                </button>
              </span>
            </template>
          </DataTable>
        </div>
      </div>
      <b-modal ref="cancel-order-modal" :static="true">
        <template v-slot:modal-title> Отмена заказа </template>
        <div class="d-block text-center">
          Вы действительно хотите отменить этот заказ ?
        </div>
        <template v-slot:modal-footer>
          <button
            class="btn btn-secondary float-left"
            @click="$refs['cancel-order-modal'].hide()"
          >
            Нет
          </button>
          <button class="btn btn-danger float-right" @click="cancelOrder">
            Да
          </button>
        </template>
      </b-modal>
    </div>
  </div>
</template>

<script>
import DataTable from "@/components/ApiDataTable";
import { mapGetters } from "vuex";
import moment from "moment";
import { ORDER_STATUSES, ORDER_MAP } from "@/utils/constants";

const DATE_PICKER_FORMAT = "YYYY-MM-DD";
const API_DATE_FORMAT = "YYYY-MM-DD HH:mm";
import _ from "lodash";

export default {
  components: {
    DataTable,
  },
  data: () => ({
    orders: [],
    fields: [
      {
        key: "id",
        label: "Номер заказа",
        sortable: true,
      },
      {
        key: "clientFullName",
        label: "Клиент",
        sortable: false,
      },
      {
        key: "phoneNumber",
        label: "Телефон",
        sortable: false,
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
      },
      {
        key: "actions",
        label: "Действия",
        sortable: false,
      },
    ],
    orderStatus: null,
    orderStatusOptions: [
      { text: "Не выбрано", value: null },
      { text: "В обработке", value: ORDER_STATUSES.PENDING },
      { text: "Отменен", value: ORDER_STATUSES.CANCELLED },
      { text: "Доставлен", value: ORDER_STATUSES.SHIPPED },
      { text: "Ожидает доставки", value: ORDER_STATUSES.AWAITING_SHIPMENT },
      { text: "Выполнен", value: ORDER_STATUSES.COMPLETED },
    ],
    categories: [],
    dateFrom: null,
    dateTo: null,
    orderProductCategory: null,
    totalOrderPriceFrom: null,
    totalOrderPriceTo: null,
    stringForSearch: null,
    paid: null,
    paidOptions: [
      { text: "Не выбрано", value: null },
      { text: "Не оплачен", value: false },
      { text: "Оплачен", value: true },
    ],
  }),
  watch: {
    stringForSearch: function () {
      this.retrieveOrdersWithDelay();
    },
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
    showModalForCancel(orderId) {
      const modal = this.$refs["cancel-order-modal"];
      modal.orderId = orderId;
      modal.show();
    },
    async cancelOrder() {
      const modal = this.$refs["cancel-order-modal"];
      await this.$store.dispatch("cancelOrder", modal.orderId);
      this.applyFilters();
      modal.hide();
    },
    async itemsProvider(ctx) {
      const filters = {
        pageNumber: ctx.currentPage,
        perPage: ctx.perPage,
        status: this.orderStatus,
        categoryId: this.orderProductCategory,
        fromPrice: this.totalOrderPriceFrom,
        toPrice: this.totalOrderPriceTo,
        stringForSearch: ctx.filter,
        paid: this.paid,
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
      return await this.$store.dispatch("fetchOrdersByFilters", filters);
    },
    canBeCancelled(order) {
      return (
        order.status !== ORDER_STATUSES.CANCELLED &&
        order.status !== ORDER_STATUSES.COMPLETED &&
        order.status !== ORDER_STATUSES.SHIPPED
      );
    },
  },
  computed: {
    ...mapGetters(["allCategories"]),
  },
  created: async function () {
    this.retrieveOrdersWithDelay = _.debounce(this.applyFilters, 800);
    await this.$store.dispatch("fetchCategoriesIfTheyAreNotLoaded");
    this.categories = this.allCategories;
  },
};
</script>

<style scoped>
#add-order-btn {
  position: fixed;
  bottom: 50px;
  right: 50px;
  z-index: 500;
}
</style>
