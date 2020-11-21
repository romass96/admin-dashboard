<template>
  <div class="card shadow mb-4 border-left-primary">
    <div class="card-header py-3">
      <h6 class="m-0 font-weight-bold text-primary">Детали заказа</h6>
    </div>
    <div class="card-body">
      <form>
        <div class="form-group">
          <label for="orderId">ID</label>
          <input type="text" class="form-control" id="orderId" v-model.trim="order.id" disabled>
        </div>

        <b-table hover bordered
          :items="items"
          :fields="fields">
        </b-table>

        <h5 class="font-weight-bold mb-4">Общая стоимость: {{ order.totalOrderPrice }}</h5>

        <div class="form-group">
          <label for="orderComment">Комментарий</label>
          <textarea class="form-control" id="orderComment" v-model.trim="order.comment" disabled />
        </div>

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
  }
}
</script>
