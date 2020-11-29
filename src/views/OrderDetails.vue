<template>
  <div class="card shadow mb-4 border-left-primary">
    <div class="card-header py-3">
      <h6 class="m-0 font-weight-bold text-primary">Детали заказа</h6>
    </div>
    <div class="card-body">
      <form>
        <div class="row">
          <div class="col-md-6">
            <label for="orderId" class="font-weight-bold">ID</label>
          </div>
          <div class="col-md-6">
            <p id="orderId">{{ order.id }}</p>
          </div>
        </div>
        <div class="row">
          <div class="col-md-6">
            <label for="client" class="font-weight-bold">Клиент</label>
          </div>
          <div class="col-md-6">
            <p id="client">{{ clientFullName }}</p>
          </div>
        </div>
        <div class="row">
          <div class="col-md-6">
            <label for="orderDate" class="font-weight-bold">Дата и время заказа</label>
          </div>
          <div class="col-md-6">
            <p id="orderDate">{{ order.createdDate }}</p>
          </div>
        </div>
        <div class="row">
          <div class="col-md-6">
            <label for="status" class="font-weight-bold">Статус</label>
          </div>
          <div class="col-md-6">
            <p id="status">{{ statusText }}</p>
          </div>
        </div>
        <div class="row">
          <div class="col-md-6">
            <label for="comment" class="font-weight-bold">Комментарий</label>
          </div>
          <div class="col-md-6">
            <p id="comment">{{ order.comment }}</p>
          </div>
        </div>

        <b-table hover bordered
          :items="items"
          :fields="fields">
        </b-table>

        <h5 class="font-weight-bold mb-4">Общая стоимость: {{ order.totalOrderPrice }}</h5>

        <div class="dropdown-divider"></div>

        <router-link to="/orders" class="btn btn-secondary btn-icon-split">
          <span class="icon text-white-50" >
            <i class="fas fa-arrow-left"></i>
          </span>
          <span class="text">Назад к заказам</span>
        </router-link>
      </form>
    </div>
  </div>
</template>

<script>
import { ORDER_MAP } from "@/utils/constants";

export default {
  data: () => ({
    order: {},
    fields: [{
      key: 'product.name',
      label: "Товар"
    },
    {
      key: 'purchasePrice',
      label: 'Цена'
    },
    {
      key: 'quantity',
      label: 'Количество'
    },
    {
      key: 'totalPrice',
      label: 'Общая стоимость'
    }],
    items: []
  }),
  async created() {
    const orderId = this.$route.query.orderId;
    const order = await this.$store.dispatch('fetchOrderById', orderId);
    this.items = order.orderItems;
    this.order = order;
  },
  computed: {
    statusText() {
      return ORDER_MAP[this.order.status];
    },
    clientFullName() {
      return this.order.client ? this.order.client.firstName + " " + this.order.client.lastName : "";
    }
  }
}
</script>
