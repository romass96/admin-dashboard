import httpUtils from '@/utils/http.utils'

const apiUrl = process.env.VUE_APP_API_URL + "/api/clients";

export default {
  actions: {
    async fetchClients(context) {
      const response = await httpUtils.axiosWithHeader().get(apiUrl);
      const clients = response.data;
      context.commit('updateClients', clients);
      context.commit('setClientsLoaded');
      return clients;
    },
    async fetchClientsIfTheyAreNotLoaded(context) {
      if (!context.state.clientsLoaded) {
        await context.dispatch('fetchClients');
      }
    }
  },
  mutations: {
    setClientsLoaded(state) {
      state.usersLoaded = true;
    },
    updateClients(state, clients) {
      state.clients = clients;
    }
  },
  state: {
    clients: [],
    clientsLoaded: false
  },
  getters: {
    allClients(state) {
      return state.clients;
    },
    areClientsLoaded(state) {
      return state.clientsLoaded;
    }
  }
}
