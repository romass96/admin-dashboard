import httpUtils from '@/utils/http.utils'

const apiUrl = process.env.VUE_APP_API_URL + "/api/products";

export default {
  actions: {
    async fetchProducts(context) {
      const response = await httpUtils.axiosWithHeader().get(apiUrl);
      const products = response.data;
      context.commit('updateProducts', products);
      context.commit('setProductsLoaded');
      return products;
    },
    async fetchProductsIfTheyAreNotLoaded(context) {
      if (!context.state.loaded) {
        await context.dispatch('fetchProducts');
      }
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
    setProductsLoaded(state) {
      state.loaded = true;
    }
  },
  state: {
    products: [],
    loaded: false
  },
  getters: {
    allProducts(state) {
      return state.products;
    },
    findProductById: state => id => state.products.find(product => product.id == id),
    areProductsLoaded(state) {
      return state.loaded;
    }
  }
}
