<template>
  <div>
    <div class="row">
            <div class="col-md-3">
        <div class="card shadow mb-4">
          <a
            href="#filters"
            class="d-block card-header py-3 collapsed"
            data-toggle="collapse"
            role="button"
            aria-expanded="true"
            aria-controls="filters"
          >
            <h6 class="m-0 font-weight-bold text-dark">
              <i class="fas fa-filter"></i>
              Фильтры
            </h6>
          </a>
          <div class="collapse show" id="filters">
            <div class="card-body">
              <div class="form-row">
                <div class="form-group col-md-12">
                  <label for="categorySelect">Категория товара</label>
                  <select
                    class="form-control custom-select"
                    id="categorySelect"
                    v-model="productCategory"
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
          v-for="productQuestion in productQuestions"
          :key="productQuestion.id"
        >
          <div class="card-body">
            <div
              class="d-flex flex-row align-items-center justify-content-between"
            >
              <h6 class="m-0 font-weight-bold">
                <i class="fas fa-shopping-bag"></i>
                {{ productQuestion.productName }}
              </h6>
              <div
                class="d-flex flex-row align-items-center justify-content-between"
              >
                <span>
                  {{ productQuestion.createdDate }}
                </span>
              </div>
            </div>
            <hr />
            <p>
              {{ productQuestion.text }}
            </p>
            <hr />
            <div
              class="d-flex flex-row align-items-center justify-content-between"
            >
              <router-link class="m-0 font-weight-bold text-primary"
                :to="{
                  name: 'client-info',
                  query: { clientId: productQuestion.clientId },
                }"
              >
                {{ productQuestion.clientFullName }}
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
          v-if="productQuestions.length"
          v-model="currentPage"
          :total-rows="totalRows"
          :per-page="perPage"
          align="center"
          @change="changePage"
        >
        </b-pagination>
        <h3 class="text-center mt-5" v-else>Вопросов пока нет</h3>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import _ from "lodash";
import moment from "moment";

const DATE_PICKER_FORMAT = "YYYY-MM-DD";
const API_DATE_FORMAT = "YYYY-MM-DD HH:mm";

export default {
  data: () => ({
    productQuestions: [],
    products: [],
    fields: [
      {
        key: "productName",
        label: "Название товара"
      },
      {
        key: "clientFullName",
        label: "Клиент"
      },
      {
        key: "createdDate",
        label: "Дата создания",
        sortable: true
      },
      {
        key: "actions",
        label: "Действия",
        sortable: false,
      },
    ],
    stringForSearch: null,
    perPageOptions: [5, 10, 15, 20, 25, 50],
    currentPage: 1,
    perPage: 5,
    totalRows: 10,
    categories: [],
    productCategory: null,
    dateFrom: null,
    dateTo: null,
  }),
  created: async function () {
    this.retrieveProductQuestionsWithDelay = _.debounce(this.applyFilters, 800);
    await this.$store.dispatch("fetchCategoriesIfTheyAreNotLoaded");
    this.categories = this.allCategories;
    await this.retrieveProductQuestions();
  },
  watch: {
    stringForSearch: function () {
      this.retrieveProductQuestionsWithDelay();
    },
  },
  computed: {
    ...mapGetters([
      "allFilteredProductQuestions",
      "totalFilteredProductQuestionsCount",
      "allCategories",
    ]),
    rows() {
      return this.products.length;
    }
  },
  methods: {
    async changePerPage(value) {
      this.perPage = value;
      this.currentPage = 1;
      await this.retrieveProductQuestions();
    },
    async changePage(value) {
      this.currentPage = value;
      await this.retrieveProductQuestions();
    },
    async retrieveProductQuestions() {
      const filters = {
        pageNumber: this.currentPage,
        perPage: this.perPage,
        categoryId: this.productCategory
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
      await this.$store.dispatch("fetchProductQuestionsByFilters", filters);
      this.productQuestions = this.allFilteredProductQuestions;
      this.totalRows = this.totalFilteredProductQuestionsCount;
    },
    async resetFilters() {
      this.currentPage = 1;
      this.dateFrom = null;
      this.dateTo = null;
      this.productCategory = null;
      await this.retrieveProductQuestions()
    },
    async applyFilters() {
      this.currentPage = 1;
      await this.retrieveProductQuestions();
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
