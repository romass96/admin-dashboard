import httpUtils from '@/utils/http.utils'

const apiUrl = process.env.VUE_APP_API_URL + "/api/users";

export default {
  actions: {
    async fetchUsers(context) {
      const response = await httpUtils.axiosWithHeader().get(apiUrl);
      const users = response.data;
      context.commit('updateUsers', users);
      context.commit('setUsersLoaded');
      return users;
    },
    async fetchUsersIfTheyAreNotLoaded(context) {
      if (!context.state.usersLoaded) {
        await context.dispatch('fetchUsers');
      }
    }
  },
  mutations: {
    setUsersLoaded(state) {
      state.usersLoaded = true;
    },
    updateUsers(state, users) {
      state.users = users;
    }
  },
  state: {
    users: [],
    usersLoaded: false
  },
  getters: {
    allUsers(state) {
      return state.users;
    },
    areUsersLoaded(state) {
      return state.usersLoaded;
    }
  }
}
