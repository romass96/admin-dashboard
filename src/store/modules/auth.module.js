import axios from 'axios'
import Vue from 'vue';
import httpUtils from '@/utils/http.utils'

const apiUrl = process.env.VUE_APP_API_URL;

export default {
  actions: {
    async login({commit},{email, password, rememberMe}) {
      try {
        const response = await axios.post(apiUrl + '/api/auth/admin/signin', {
            email, password
        });
        const userInfo = response.data;
        if (rememberMe) {
          Vue.cookie.set('token', userInfo.token, {expires: '1h'});
        }
        commit('setUser', userInfo);
      } catch (e) {
        commit('loginFailure');
        throw e;
      }
    },
    logout({commit}) {
      window.sessionStorage.clear();
      Vue.cookie.delete('token');
      commit('logout');
    },
    async resetPassword() {

    },
    async fetchUserInfo(context, token) {
      context.commit('setUser', {token});
      const response = await httpUtils.axiosWithHeader().get(apiUrl + '/api/auth/fetchUserInfo');
      context.commit('setUser', response.data);
    }
  },
  mutations: {
    loginFailure(state) {
      state.user = null;
    },
    logout(state) {
      state.user = null;
    },
    setUser(state, user) {
      state.user = user;
    }
  },
  state: {
    user: null
  },
  getters: {
    getUser(state) {
      return state.user;
    }
  }
}
