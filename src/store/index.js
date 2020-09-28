import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate";
import CategoryModule from './modules/category.module'
import ProductModule from './modules/product.module'
import AuthModule from './modules/auth.module'
import UserModule from './modules/user.module'
import ClientModule from './modules/client.module'
import FeedbackModule from './modules/feedback.module'

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    CategoryModule,
    AuthModule,
    ProductModule,
    UserModule,
    ClientModule,
    FeedbackModule
  },
  plugins: [
    createPersistedState({
      storage: window.sessionStorage,
    })
  ]
});
