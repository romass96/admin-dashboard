import httpUtils from '@/utils/http.utils'

const apiUrl = process.env.VUE_APP_API_URL + "/api/products";

export default {
  actions: {
    async fetchProductsByFilters(context, filters) {
      const response = await httpUtils.axiosWithHeader().post(apiUrl + '/filter', filters);
      context.commit('updateFilteredProducts', response.data.items);
      context.commit('updateFilteredProductsCount', response.data.totalItems);
    },
    async addProduct(context, product) {
      const response = await httpUtils.axiosWithHeader().post(apiUrl, product);
      const productWithId = response.data;
      context.commit('addProduct', productWithId);
    },
    async archiveProduct(context, productId) {
      const url = `${apiUrl}/archive?id=${productId}`;
      await httpUtils.axiosWithHeader().post(url);
      context.commit('removeProduct', productId);
    },
    async unarchiveProduct(context, productId) {
      const url = `${apiUrl}/unarchive?id=${productId}`;
      await httpUtils.axiosWithHeader().post(url);
      context.commit('removeProduct', productId);
    },
    async updateProduct(context, product) {
      await httpUtils.axiosWithHeader().put(apiUrl, product);
      await context.dispatch('fetchProducts');
    },
    async fetchSoldProductsStatistics(context) {
      const response = await httpUtils.axiosWithHeader().get(apiUrl + '/productSoldStatistics');
      context.commit('updateSoldProductsStatistics', response.data);
    },
    async fetchAllProducts(context) {
      const response = await httpUtils.axiosWithHeader().get(apiUrl);
      context.commit('updateAllProducts', response.data);
    },
    async fetchClientProductsByCategories(context, clientId) {
      const response = await httpUtils.axiosWithHeader().get(apiUrl + '/clientProductsForCategories?clientId=' + clientId);
      return response.data;
    },
    async fetchProductById(context, productId) {
      const url = `${apiUrl}/${productId}`;
      const response = await httpUtils.axiosWithHeader().get(url);
      return response.data;
    }
  },
  mutations: {
    updateFilteredProducts(state, products) {
      state.filteredProducts = products;
    },
    removeProduct(state, productId) {
      const index = state.filteredProducts.findIndex(product => product.id === productId);
      state.filteredProducts.splice(index, 1);
    },
    addProduct(state, product) {
      state.products.push(product);
    },
    updateFilteredProductsCount(state, productsCount) {
      state.filteredProductsCount = productsCount;
    },
    updateSoldProductsStatistics(state, statistics) {
      state.soldProductsStatistics = statistics;
    },
    updateAllProducts(state, products) {
      state.allProducts = products;
    }
  },
  state: {
    allProducts: [],
    filteredProducts: [],
    filteredProductsCount: 0,
    soldProductsStatistics: []
  },
  getters: {
    allProducts(state) {
      return state.allProducts;
    },
    allFilteredProducts(state) {
      return state.filteredProducts;
    },
    findProductById: state => id => state.products.find(product => product.id == id),
    totalFilteredProductsCount(state) {
      return state.filteredProductsCount;
    },
    soldProductsStatistics(state) {
      return state.soldProductsStatistics;
    },
    // findProductById: state => id => state.allProducts.find(product => product.id == id),
  }
}
