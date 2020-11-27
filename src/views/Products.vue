<template>
  <div class="row">
    <div class="col-md-12">
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
              <div class="form-group col-md-4">
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
              <div class="form-group col-md-3">
                <label for="from-price">Цена товара с</label>
                <input
                  type="number"
                  class="form-control"
                  id="from-price"
                  v-model="productPriceFrom"
                />
              </div>
              <div class="form-group col-md-3">
                <label for="to-price">Цена товара по</label>
                <input
                  type="number"
                  class="form-control"
                  id="to-price"
                  v-model="productPriceTo"
                />
              </div>
              <!-- <div
                class="form-check col-md-2"
                style="display: flex; align-items: flex-end"
              >
                <input
                  type="checkbox"
                  class="form-check-input"
                  v-model="productArchived"
                  id="productArchived"
                />
                <label for="productArchived" class="form-check-label"
                  >С архива</label
                >
              </div> -->
              <div class="form-check col-md-2" style="padding: 40px 0 0 15px">
                <b-form-checkbox v-model="productArchived">
                  С архива
                </b-form-checkbox>
              </div>
            </div>
            <div class="form-row">
              <div
                class="form-group col-md-4 offset-md-8 d-flex justify-content-between"
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
    <div class="col-md-12">
      <div class="card shadow mb-4">
        <div
          class="card-header py-3 d-flex flex-row align-items-center justify-content-between"
        >
          <h6 class="m-0 font-weight-bold text-primary">Товары</h6>
          <div class="dropdown no-arrow">
            <a
              class="dropdown-toggle"
              href="#"
              role="button"
              id="dropdownMenuLink"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              <i class="fas fa-ellipsis-v fa-sm fa-fw text-gray-400"></i>
            </a>
            <div
              class="dropdown-menu dropdown-menu-right shadow animated--fade-in"
              aria-labelledby="dropdownMenuLink"
            >
              <a class="dropdown-item" href="#">Экспорт в Excel</a>
            </div>
          </div>
        </div>
        <div class="card-body">
          <router-link
            class="btn btn-dark btn-circle btn-lg"
            v-b-tooltip.hover
            title="Добавить товар"
            id="add-product-btn"
            tag="button"
            to="/createProduct"
          >
            <i class="fas fa-plus"></i>
          </router-link>

          <DataTable
            :itemsProvider="itemsProvider"
            :fields="fields"
            ref="productTable"
          >
            <template v-slot:cell(actions)="data">
              <span class="table-action-bar">
                <router-link
                  tag="button"
                  class="btn table-toolbar-btn btn-dark btn-sm m-1"
                  v-b-tooltip.hover
                  title="Детали"
                  :to="{
                    name: 'view-product',
                    query: { productId: data.item.id },
                  }"
                >
                  <i class="fas fa-info"></i>
                </router-link>
                <router-link
                  tag="button"
                  class="btn table-toolbar-btn btn-dark btn-sm m-1"
                  v-b-tooltip.hover
                  title="Изменить"
                  :to="{
                    name: 'edit-product',
                    query: { productId: data.item.id },
                  }"
                >
                  <i class="fas fa-pencil-alt"></i>
                </router-link>

                <button
                  class="btn table-toolbar-btn btn-dark btn-sm m-1"
                  v-b-tooltip.hover
                  title="Внести на склад"
                  @click="showModalForArchive(data.id)"
                >
                  <i class="fas fa-dolly-flatbed"></i>
                </button>
                <button
                  class="btn table-toolbar-btn btn-dark btn-sm m-1"
                  v-b-tooltip.hover
                  title="Статистика"
                  @click="showModalForArchive(data.id)"
                >
                  <i class="fas fa-chart-bar"></i>
                </button>
                <router-link
                  tag="button"
                  class="btn table-toolbar-btn btn-dark btn-sm m-1"
                  v-b-tooltip.hover
                  title="Клонировать"
                  :to="{
                    name: 'create-product',
                    query: { sourceId: data.item.id },
                  }"
                >
                  <i class="fas fa-clone"></i>
                </router-link>
                <button
                  v-if="data.item.archived"
                  class="btn table-toolbar-btn btn-dark btn-sm m-1"
                  v-b-tooltip.hover
                  title="Восстановить с архива"
                  @click="showModalForUnarchive(data.item.id)"
                >
                  <i class="fas fa-trash-restore"></i>
                </button>
                <button
                  v-else
                  class="btn table-toolbar-btn btn-danger btn-sm m-1"
                  v-b-tooltip.hover
                  title="В архив"
                  @click="showModalForArchive(data.item.id)"
                >
                  <i class="fas fa-trash"></i>
                </button>
              </span>
            </template>
          </DataTable>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import DataTable from "@/components/ApiDataTable";
import { mapGetters } from "vuex";
import _ from "lodash";

export default {
  components: {
    DataTable,
  },
  data: () => ({
    products: [],
    fields: [
      {
        key: "name",
        label: "Название",
        sortable: true,
      },
      {
        key: "categoryName",
        label: "Категория",
        sortable: false,
      },
      {
        key: "price",
        label: "Цена",
        sortable: true,
      },
      {
        key: "quantity",
        label: "Количество на складе",
        sortable: true,
      },
      {
        key: "actions",
        label: "Действия",
        sortable: false,
      },
    ],
    stringForSearch: null,
    productPriceFrom: null,
    productPriceTo: null,
    productCategory: null,
    productArchived: false,
    categories: [],
  }),
  created: async function () {
    this.retrieveOrdersWithDelay = _.debounce(this.applyFilters, 800);
    await this.$store.dispatch("fetchCategoriesIfTheyAreNotLoaded");
    this.categories = this.allCategories;
  },
  watch: {
    stringForSearch: function () {
      this.retrieveProductsWithDelay();
    },
  },
  computed: {
    ...mapGetters([
      "allFilteredProducts",
      "totalFilteredProductsCount",
      "allCategories",
    ]),
    rows() {
      return this.products.length;
    },
  },
  methods: {
    showModalForArchive(productId) {
      const archiveHandler = this.archiveProduct;

      this.$swal("Вы действительно хотите переместить этот товар в архив?", {
        buttons: {
          cancel: "Нет",
          confirm: "Да",
        },
      }).then(function (value) {
        if (value) {
          archiveHandler(productId);
        }
      });
    },
    showModalForUnarchive(productId) {
      const unarchiveHandler = this.unarchiveProduct;

      this.$swal("Вы действительно хотите восстановить этот товар из архива?", {
        buttons: {
          cancel: "Нет",
          confirm: "Да",
        },
      }).then(function (value) {
        if (value) {
          unarchiveHandler(productId);
        }
      });
    },
    archiveProduct(productId) {
      this.$store.dispatch("archiveProduct", productId).then(function () {
        this.products = this.allFilteredProducts;
      });
    },
    unarchiveProduct(productId) {
      this.$store.dispatch("unarchiveProduct", productId).then(function () {
        this.products = this.allFilteredProducts;
      });
    },
    async itemsProvider(ctx) {
      const filters = {
        pageNumber: ctx.currentPage,
        perPage: ctx.perPage,
        stringForSearch: ctx.filter,
        archived: this.productArchived,
        fromPrice: this.productPriceFrom,
        toPrice: this.productPriceTo
      };

      if (ctx.sortBy.length) {
        filters.sortBy = ctx.sortBy;
        filters.sortDesc = ctx.sortDesc;
      }
      await this.$store.dispatch("fetchProductsByFilters", filters);
      return {
        items: this.allFilteredProducts,
        totalItems: this.totalFilteredProductsCount,
      };
    },
    applyFilters() {
      this.$refs.productTable.refresh();
    },
    resetFilters() {
      this.productCategory = null;
      this.productPriceFrom = null;
      this.productPriceTo = null;
      this.productArchived = false;

      this.$refs.productTable.refresh();
    },
  },
};
</script>

<style scoped>
#add-product-btn {
  position: fixed;
  bottom: 50px;
  right: 50px;
}

.form-control:focus {
  box-shadow: none;
}
</style>
