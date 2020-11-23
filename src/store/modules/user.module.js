import httpUtils from '@/utils/http.utils'

const apiUrl = process.env.VUE_APP_API_URL + "/api/users";

export default {
  actions: {
    async fetchUsers(context) {
      const response = await httpUtils.axiosWithHeader().get(apiUrl);
      const users = response.data;
      context.commit('updateUsers', users);
      return users;
    },
    async lockUser(context, userId) {
      await httpUtils.axiosWithHeader().post(apiUrl + '/lockUser', {userId});
    },
    async unlockUser(context, userId) {
      await httpUtils.axiosWithHeader().post(apiUrl + '/unlockUser', {userId});
    }
  },
  mutations: {
    updateUsers(state, users) {
      state.users = users;
    }
  },
  state: {
    users: []
  },
  getters: {
    allUsers(state) {
      return state.users;
    }
  }
}
