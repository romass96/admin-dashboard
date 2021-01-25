<template>
  <div>
    <div class="row">
      <div class="col-xl-3 col-md-6 mb-4">
        <div class="card border-left-primary shadow h-100 py-2">
          <div class="card-body">
            <div class="row no-gutters align-items-center">
              <div class="col mr-2">
                <div
                  class="text-xs font-weight-bold text-primary text-uppercase mb-1"
                >
                  Всего отзывов
                </div>
                <div class="h5 mb-0 font-weight-bold text-gray-800">
                  {{ allFeedbacksCount }}
                </div>
              </div>
              <div class="col-auto">
                <i class="fas fa-comment-alt fa-2x text-gray-300"></i>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="col-xl-3 col-md-6 mb-4">
        <div class="card border-left-success shadow h-100 py-2">
          <div class="card-body">
            <div class="row no-gutters align-items-center">
              <div class="col mr-2">
                <div
                  class="text-xs font-weight-bold text-success text-uppercase mb-1"
                >
                  Положительных отзывов
                </div>
                <div class="h5 mb-0 font-weight-bold text-gray-800">
                  {{ positiveFeedbacksCount }}
                </div>
              </div>
              <div class="col-auto">
                <i class="fas fa-smile fa-2x text-gray-300"></i>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="col-xl-3 col-md-6 mb-4">
        <div class="card border-left-warning shadow h-100 py-2">
          <div class="card-body">
            <div class="row no-gutters align-items-center">
              <div class="col mr-2">
                <div
                  class="text-xs font-weight-bold text-warning text-uppercase mb-1"
                >
                  Нормальных отзывов
                </div>
                <div class="h5 mb-0 font-weight-bold text-gray-800">
                  {{ normalFeedbacksCount }}
                </div>
              </div>
              <div class="col-auto">
                <i class="fas fa-meh fa-2x text-gray-300"></i>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="col-xl-3 col-md-6 mb-4">
        <div class="card border-left-danger shadow h-100 py-2">
          <div class="card-body">
            <div class="row no-gutters align-items-center">
              <div class="col mr-2">
                <div
                  class="text-xs font-weight-bold text-danger text-uppercase mb-1"
                >
                  Негативных отзывов
                </div>
                <div class="row no-gutters align-items-center">
                  <div class="col-auto">
                    <div class="h5 mb-0 mr-3 font-weight-bold text-gray-800">
                      {{ negativeFeedbacksCount }}
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-auto">
                <i class="fas fa-frown fa-2x text-gray-300"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col-md-3">
        <div class="card shadow mb-4">
          <a
            href="#feedbackFilters"
            class="d-block card-header py-3 collapsed"
            data-toggle="collapse"
            role="button"
            aria-expanded="true"
            aria-controls="feedbackFilters"
          >
            <h6 class="m-0 font-weight-bold text-dark">
              <i class="fas fa-filter"></i>
              Фильтры
            </h6>
          </a>
          <div class="collapse show" id="feedbackFilters">
            <div class="card-body">
              <div class="form-row">
                <div class="form-group col-md-12">
                  <label for="from-datepicker">Тип отзыва</label>
                  <b-form-select
                    v-model="feedbackType"
                    :options="feedbackTypes"
                  />
                </div>
              </div>
              <div class="form-row">
                <div class="form-group col-md-12">
                  <label for="categorySelect">Категория товара</label>
                  <select
                    class="form-control custom-select"
                    id="categorySelect"
                    v-model="feedbackProductCategory"
                  >
                    <option selected disabled :value="null">
                      Выберите категорию
                    </option>
                    <option
                      v-for="category in categories"
                      :value="category.id"
                      :key="category.id"
                    >
                      {{ category.name }}
                    </option>
                  </select>
                </div>
              </div>
              <div class="form-row">
                <div class="form-group col-md-12">
                  <label for="from-datepicker">С</label>
                  <b-form-datepicker
                    id="from-datepicker"
                    v-model="dateFrom"
                    class="mb-2"
                    placeholder="Выберите дату"
                    :date-format-options="{
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    }"
                  />
                </div>
              </div>
              <div class="form-row">
                <div class="form-group col-md-12">
                  <label for="to-datepicker">По</label>
                  <b-form-datepicker
                    id="to-datepicker"
                    v-model="dateTo"
                    class="mb-2"
                    placeholder="Выберите дату"
                    :date-format-options="{
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    }"
                  />
                </div>
              </div>
              <div class="form-row">
                <div
                  class="form-group col-md-12 d-flex justify-content-between"
                >
                  <button
                    class="btn btn-secondary flex-grow-1 mr-1"
                    @click="resetFilters"
                  >
                    Сбросить
                  </button>
                  <button
                    class="btn btn-primary flex-grow-1 ml-1"
                    @click="applyFilters"
                  >
                    Применить
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-9">
        <div class="mb-2 d-flex justify-content-between">
          <div class="d-inline-block">
            <span>Показывать </span>
            <select
              class="form-control"
              id="perPageSelect"
              @change="changePerPage($event.target.value)"
            >
              <option v-for="p in perPageOptions" :key="p" :value="p">
                {{ p }}
              </option>
            </select>
            <span> записей</span>
          </div>
          <div class="d-inline-block">
            <div class="input-group flex-nowrap">
              <div class="input-group-prepend">
                <span class="input-group-text">
                  <i class="fas fa-search"></i>
                </span>
              </div>
              <input
                type="text"
                class="form-control"
                placeholder="Поиск"
                v-model="stringForSearch"
              />
            </div>
          </div>
        </div>
        <div
          class="card shadow mb-4"
          v-for="feedback in feedbacks"
          :key="feedback.id"
        >
          <div class="card-body">
            <div
              class="d-flex flex-row align-items-center justify-content-between"
            >
              <h6 class="m-0 font-weight-bold">
                <i class="fas fa-shopping-bag"></i>
                {{ feedback.productName }}
              </h6>
              <div
                class="d-flex flex-row align-items-center justify-content-between"
              >
                <BFormRating
                  v-model="feedback.rating"
                  variant="warning"
                  size="sm"
                  inline
                  no-border
                  readonly
                />
                <span>
                  {{ feedback.createdDate }}
                </span>
              </div>
            </div>
            <hr />
            <p>
              {{ feedback.text }}
            </p>
            <hr />
            <h6 class="m-0 font-weight-bold text-success">Достоинства:</h6>
            <p>
              {{ feedback.advantages }}
            </p>
            <h6 class="m-0 font-weight-bold text-danger">Недостатки:</h6>
            <p>
              {{ feedback.disadvantages }}
            </p>
            <div
              class="d-flex flex-row align-items-center justify-content-between"
            >
              <router-link class="m-0 font-weight-bold text-primary"
                :to="{
                  name: 'client-info',
                  query: { clientId: feedback.clientId },
                }"
              >
                {{ feedback.clientFullName }}
              </router-link>
              <button class="btn btn-dark btn-icon-split ml-1">
                <span class="icon text-white-50">
                  <i class="fas fa-share"></i>
                </span>
                <span class="text">Ответить</span>
              </button>
            </div>
          </div>
        </div>
        <b-pagination
          v-if="feedbacks.length"
          v-model="currentPage"
          :total-rows="totalRows"
          :per-page="perPage"
          align="center"
          @change="changePage"
        >
        </b-pagination>
        <h3 class="text-center mt-5" v-else>Отзывов пока нет</h3>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { BFormRating } from "bootstrap-vue";
import { FormSelectPlugin } from "bootstrap-vue";
import moment from "moment";
import Vue from "vue";
import { FEEDBACKS } from "@/utils/constants";
import _ from "lodash";

Vue.use(FormSelectPlugin);

const DATE_PICKER_FORMAT = "YYYY-MM-DD";
const API_DATE_FORMAT = "YYYY-MM-DD HH:mm";

export default {
  components: {
    BFormRating,
  },
  data: () => ({
    feedbacks: [],
    dateFrom: null,
    dateTo: null,
    feedbackType: FEEDBACKS.ALL,
    feedbackTypes: [
      {
        text: "Все",
        value: FEEDBACKS.ALL,
      },
      {
        text: "Положительные",
        value: FEEDBACKS.POSITIVE,
      },
      {
        text: "Нормальные",
        value: FEEDBACKS.NORMAL,
      },
      {
        text: "Негативные",
        value: FEEDBACKS.NEGATIVE,
      },
    ],
    perPageOptions: [5, 10, 15, 20, 25, 50],
    categories: [],
    feedbackProductCategory: null,
    currentPage: 1,
    perPage: 5,
    totalRows: 10,
    stringForSearch: null,
  }),
  watch: {
    stringForSearch: function () {
      this.retrieveFeedbacksWithDelay();
    },
  },
  created: async function () {
    this.retrieveFeedbacksWithDelay = _.debounce(this.retrieveFeedbacks, 500);
    this.setFiltersFromRoute(this.$route);
    await this.retrieveFeedbacks();

    await this.$store.dispatch("fetchCategoriesIfTheyAreNotLoaded");
    this.categories = this.allCategories;

    await this.$store.dispatch("fetchFeedbacksStatistics");
  },
  async beforeRouteUpdate(to, from, next) {
    this.resetFilters();
    this.setFiltersFromRoute(to);
    await this.retrieveFeedbacks();
    next();
  },
  computed: {
    ...mapGetters([
      "allFeedbacks",
      "allCategories",
      "totalFeedbackCount",
      "negativeFeedbacksCount",
      "positiveFeedbacksCount",
      "normalFeedbacksCount",
      "allFeedbacksCount",
    ]),
  },
  methods: {
    async changePerPage(value) {
      this.perPage = value;
      this.currentPage = 1;
      await this.retrieveFeedbacks();
    },
    async changePage(value) {
      this.currentPage = value;
      await this.retrieveFeedbacks();
    },
    async retrieveFeedbacks() {
      const ratings = this.getRatings(this.feedbackType);
      const filters = {
        pageNumber: this.currentPage,
        perPage: this.perPage,
        categoryId: this.feedbackProductCategory,
        ...ratings,
      };
      const toDate = moment(this.dateTo, DATE_PICKER_FORMAT);
      if (toDate._isValid) {
        filters.toDate = toDate.hour(23).minute(59).format(API_DATE_FORMAT);
      }
      const fromDate = moment(this.dateFrom, DATE_PICKER_FORMAT);
      if (fromDate._isValid) {
        filters.fromDate = fromDate.format(API_DATE_FORMAT);
      }

      if (this.stringForSearch) {
        filters.stringForSearch = this.stringForSearch;
      }
      await this.$store.dispatch("fetchFeedbacksByFilters", filters);
      this.feedbacks = this.allFeedbacks;
      this.totalRows = this.totalFeedbackCount;
    },
    async resetFilters() {
      this.currentPage = 1;
      this.feedbackType = FEEDBACKS.ALL;
      this.dateFrom = null;
      this.dateTo = null;
      this.feedbackProductCategory = null;
      await this.retrieveFeedbacks();
    },
    async applyFilters() {
      this.currentPage = 1;
      await this.retrieveFeedbacks();
    },
    getRatings(feedbackType) {
      switch (feedbackType) {
        case FEEDBACKS.ALL:
          return {
            fromRating: 0,
            toRating: 5,
          };
        case FEEDBACKS.POSITIVE:
          return {
            fromRating: 4.1,
            toRating: 5,
          };
        case FEEDBACKS.NEGATIVE:
          return {
            fromRating: 0,
            toRating: 2.9,
          };
        case FEEDBACKS.NORMAL:
          return {
            fromRating: 3,
            toRating: 4,
          };
        default:
          return {
            fromRating: 0,
            toRating: 5,
          };
      }
    },
    setFiltersFromRoute(route) {
      this.feedbackType = route.query.feedbackType || FEEDBACKS.ALL;
      const period = route.query.period;
      if (period === "today") {
        this.dateFrom = moment().format(DATE_PICKER_FORMAT);
      } else if (period === "month") {
        this.dateFrom = moment()
          .subtract(1, "months")
          .format(DATE_PICKER_FORMAT);
      }
    },
  },
};
</script>

<style scoped>
#perPageSelect {
  width: 70px;
  display: inline-block;
}

.form-control:focus {
  box-shadow: none;
}
</style>
