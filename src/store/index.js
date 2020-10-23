import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate";
import CategoryModule from './modules/category.module'
import ProductModule from './modules/product.module'
import AuthModule from './modules/auth.module'
import UserModule from './modules/user.module'
import ClientModule from './modules/client.module'
import FeedbackModule from './modules/feedback.module'
import OrderModule from './modules/order.module'

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    CategoryModule,
    AuthModule,
    ProductModule,
    UserModule,
    ClientModule,
    FeedbackModule,
    OrderModule
  },
  mutations: {
    resetStore(state) {
      Object.keys(state).forEach(key => state[key] = {});
    }
  },
  plugins: [
    createPersistedState({
      paths: ['AuthModule.user'],
      storage: window.sessionStorage,
    })
  ]
});
