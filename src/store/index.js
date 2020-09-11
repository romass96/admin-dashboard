import Vue from 'vue'
import Vuex from 'vuex'
import CategoryModule from './modules/category.module'
import ProductModule from './modules/product.module'
import AuthModule from './modules/auth.module'
import UserModule from './modules/user.module'

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    CategoryModule, AuthModule, ProductModule, UserModule
  }
});
