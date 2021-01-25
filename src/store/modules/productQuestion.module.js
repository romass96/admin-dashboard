import httpUtils from '@/utils/http.utils'

const apiUrl = process.env.VUE_APP_API_URL + "/api/productQuestions";

export default {
  actions: {
    async fetchProductQuestionsByFilters(context, filters) {
      const response = await httpUtils.axiosWithHeader().post(apiUrl + '/filter', filters);
      context.commit('updateFilteredProductQuestions', response.data.items);
      context.commit('updateFilteredProductQuestionsCount', response.data.totalItems);
    }
  },
  mutations: {
    updateFilteredProductQuestions(state, productQuestions) {
      state.filteredProductQuestions = productQuestions;
    },
    updateFilteredProductQuestionsCount(state, productQuestionsCount) {
      state.filteredProductQuestionsCount = productQuestionsCount;
    }
  },
  state: {
    filteredProductQuestions: [],
    filteredProductQuestionsCount: 0
  },
  getters: {
    allFilteredProductQuestions(state) {
      return state.filteredProductQuestions;
    },
    totalFilteredProductQuestionsCount(state) {
      return state.filteredProductQuestionsCount;
    }
  }
}
