import httpUtils from '@/utils/http.utils'

const apiUrl = process.env.VUE_APP_API_URL + "/api/orders";

export default {
  actions: {
    async fetchOrdersByFilters(context, filters) {
      const response = await httpUtils.axiosWithHeader().post(apiUrl + '/filter', filters);
      context.commit('updateOrders', response.data.items);
      context.commit('updateOrdersCount', response.data.totalItems);
    },
    async fetchOrderStatistics(context, period) {
        const response = await httpUtils.axiosWithHeader().get(apiUrl + '/orderStatistics?period=' + period);
        context.commit('updateOrdersCountStatistics', response.data);
    },
    async fetchOrderById(context, orderId) {
      const response = await httpUtils.axiosWithHeader().get(apiUrl + "/orderDetails?id=" + orderId);
      return response.data;
    },
    async cancelOrder(context, orderId) {
      await httpUtils.axiosWithHeader().post(apiUrl + '/cancelOrder', {orderId});
    },
    async createOrder(context, order) {
      await httpUtils.axiosWithHeader().post(apiUrl, order);
    }
  },
  mutations: {
    updateOrders(state, orders) {
      state.orders = orders;
    },
    updateOrdersCount(state, ordersCount) {
      state.ordersCount = ordersCount;
    },
    updateOrdersCountStatistics(state, ordersCountStatistics) {
      state.ordersCountStatistics = ordersCountStatistics;
    }
  },
  state: {
    orders: [],
    ordersCount: 0,
    ordersCountStatistics: {}
  },
  getters: {
    allOrders(state) {
      return state.orders;
    },
    totalOrdersCount(state) {
      return state.ordersCount;
    },
    ordersCountStatistics(state) {
      return state.ordersCountStatistics;
    }
  }
}
