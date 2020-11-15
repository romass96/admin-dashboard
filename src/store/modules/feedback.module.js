import httpUtils from '@/utils/http.utils'
import {FEEDBACKS} from '@/utils/constants'

const apiUrl = process.env.VUE_APP_API_URL + "/api/feedbacks";

export default {
  actions: {
    async fetchFeedbacksByFilters(context, filters) {
      const response = await httpUtils.axiosWithHeader().post(apiUrl + '/filter', filters);
      const feedbacks = response.data.items;
      context.commit('updateFeedbacks', feedbacks);
      context.commit('updateTotalItems', response.data.totalItems);
    },
    async fetchFeedbacksStatistics(context) {
      const response = await httpUtils.axiosWithHeader().get(apiUrl + '/count');
      context.commit('updateFeedbacksStatistics', response.data);
    }
  },
  mutations: {
    updateFeedbacks(state, feedbacks) {
      state.feedbacks = feedbacks;
    },
    updateTotalItems(state, totalItems) {
      state.totalItems = totalItems;
    },
    updateFeedbacksStatistics(state, feedbacksStatistics) {
      state.feedbacksStatistics = feedbacksStatistics;
    }
  },
  state: {
    feedbacks: [],
    totalItems: 0,
    feedbacksStatistics: {}
  },
  getters: {
    allFeedbacks(state) {
      return state.feedbacks;
    },
    negativeFeedbacksCount(state) {
      return state.feedbacksStatistics[FEEDBACKS.NEGATIVE];
    },
    positiveFeedbacksCount(state) {
      return state.feedbacksStatistics[FEEDBACKS.POSITIVE];
    },
    normalFeedbacksCount(state) {
      return state.feedbacksStatistics[FEEDBACKS.NORMAL];
    },
    allFeedbacksCount(state) {
      return state.feedbacksStatistics[FEEDBACKS.ALL];
    },
    totalFeedbackCount(state) {
      return state.totalItems;
    },
    feedbacksStatistics(state) {
      return state.feedbacksStatistics;
    }
  }
}
