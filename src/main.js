import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index'
import '@fortawesome/fontawesome-free/css/all.css'
import '@fortawesome/fontawesome-free/js/all.js'
//import './registerServiceWorker'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import '@/assets/css/sb-admin-2.css'
import {ModalPlugin, VBTooltipPlugin, TablePlugin, PaginationPlugin  } from 'bootstrap-vue'
import Vuelidate from 'vuelidate'
import VueCookie from 'vue-cookie'


Vue.config.productionTip = false;

Vue.use(ModalPlugin);
Vue.use(VBTooltipPlugin);
Vue.use(TablePlugin);
Vue.use(PaginationPlugin);
Vue.use(Vuelidate);
Vue.use(VueCookie);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
