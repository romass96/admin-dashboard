import httpUtils from '@/utils/http.utils'

const apiUrl = process.env.VUE_APP_API_URL + "/api/clients";

export default {
  actions: {
    async fetchClientsByFilters(context, filters) {
      const response = await httpUtils.axiosWithHeader().post(apiUrl + '/filter', filters);
      context.commit('updateClients', response.data.items);
      context.commit('updateClientsCount', response.data.totalItems);
    },
    async fetchClientRegistrationStatistics(context, period) {
        const response = await httpUtils.axiosWithHeader().get(apiUrl + '/registrationStatistics?period=' + period);
        context.commit('updateClientRegistrations', response.data);
    },
    async fetchClientById(context, clientId) {
      const response = await httpUtils.axiosWithHeader().get(apiUrl + '/' + clientId);
      return response.data;
    }
  },
  mutations: {
    updateClientsCount(state, clientsCount) {
      state.clientsCount = clientsCount;
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
    clientsCount: 0,
    clientRegistrations: []
  },
  getters: {
    allClients(state) {
      return state.clients;
    },
    totalClientsCount(state) {
      return state.clientsCount;
    },
    clientRegistrations(state) {
      return state.clientRegistrations;
    }
  }
}
