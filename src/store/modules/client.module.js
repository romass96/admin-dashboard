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
    },
    async fetchClientRegistrationStatistics(context) {
        const response = await httpUtils.axiosWithHeader().get(apiUrl + '/registrationStatistics');
        context.commit('updateClientRegistrations', response.data);
    }
  },
  mutations: {
    setClientsLoaded(state) {
      state.usersLoaded = true;
    },
    updateClients(state, clients) {
      state.clients = clients;
    },
    updateClientRegistrations(state, clientRegistrations) {
      state.clientRegistrations = clientRegistrations;
    }
  },
  state: {
    clients: [],
    clientsLoaded: false,
    clientRegistrations: []
  },
  getters: {
    allClients(state) {
      return state.clients;
    },
    areClientsLoaded(state) {
      return state.clientsLoaded;
    },
    clientRegistrations(state) {
      return state.clientRegistrations;
    }
  }
}
