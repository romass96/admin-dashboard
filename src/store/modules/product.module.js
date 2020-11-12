import httpUtils from '@/utils/http.utils'

const apiUrl = process.env.VUE_APP_API_URL + "/api/products";

export default {
  actions: {
    async fetchProductsByFilters(context, filters) {
      const response = await httpUtils.axiosWithHeader().post(apiUrl + '/filter', filters);
      context.commit('updateProducts', response.data.items);
      context.commit('updateProductsCount', response.data.totalItems);
    },
    async addProduct(context, product) {
      const response = await httpUtils.axiosWithHeader().post(apiUrl, product);
      const productWithId = response.data;
      context.commit('addProduct', productWithId);
    },
    async deleteProduct(context, productId) {
      const url = `${apiUrl}/${productId}`;
      await httpUtils.axiosWithHeader().delete(url);
      context.commit('removeProduct', productId);
    },
    async updateProduct(context, product) {
      const url = `${apiUrl}/${product.id}`;
      await httpUtils.axiosWithHeader().put(url, product);
      await context.dispatch('fetchProducts');
    },
    async fetchSoldProductsStatistics(context) {
      const response = await httpUtils.axiosWithHeader().get(apiUrl + '/productSoldStatistics');
      console.log(response.data);
      context.commit('updateSoldProductsStatistics', response.data);
    }
  },
  mutations: {
    updateProducts(state, products) {
      state.products = products;
    },
    removeProduct(state, productId) {
      const index = state.products.findIndex(product => product.id === productId);
      state.products.splice(index, 1);
    },
    addProduct(state, product) {
      state.products.push(product);
    },
    updateProductsCount(state, productsCount) {
      state.productsCount = productsCount;
    },
    updateSoldProductsStatistics(state, statistics) {
      state.soldProductsStatistics = statistics;
    }
  },
  state: {
    products: [],
    productsCount: 0,
    soldProductsStatistics: []
  },
  getters: {
    allProducts(state) {
      return state.products;
    },
    findProductById: state => id => state.products.find(product => product.id == id),
    totalProductsCount(state) {
      return state.productsCount;
    },
    soldProductsStatistics(state) {
      return state.soldProductsStatistics;
    }
  }
}
