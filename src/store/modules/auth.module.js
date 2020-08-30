import axios from 'axios'

const apiUrl = process.env.VUE_APP_API_URL;

export default {
  actions: {
    async login({commit},{email, password}) {
      try {
        const response = await axios.post(apiUrl + '/api/auth/admin/signin', {
            email, password
        });
        console.log(response);
        if (response.data.token) {
          localStorage.setItem('user', response.data);
        }
        commit('loginSuccess', response.data);
      } catch (e) {
        commit('loginFailure');
        throw e;
      }
    },
    logout({commit}) {
      localStorage.removeItem('user');
      commit('logout');
    }
  },
  mutations: {
    loginSuccess(state, user) {
      state.user = user;
    },
    loginFailure(state) {
      state.user = null;
    },
    logout(state) {
      state.user = null;
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
