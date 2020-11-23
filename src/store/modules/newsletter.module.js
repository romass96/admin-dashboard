import httpUtils from '@/utils/http.utils'

const apiUrl = process.env.VUE_APP_API_URL + "/api/newsletters";

export default {
  actions: {
    async fetchNewslettersByFilters(context, filters) {
      const response = await httpUtils.axiosWithHeader().post(apiUrl + '/filter', filters);
      return {
        items: response.data.items,
        totalItems: response.data.totalItems
      }
    }
  },
  mutations: {

  },
  state: {

  },
  getters: {

  }
}