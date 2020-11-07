<template>
<div>
  <div class="card shadow mb-4">
    <div class="card-header py-3 d-flex flex-row align-items-center justify-content-between">
      <h6 class="m-0 font-weight-bold text-primary">Товары</h6>
      <div class="dropdown no-arrow">
        <a class="dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          <i class="fas fa-ellipsis-v fa-sm fa-fw text-gray-400"></i>
        </a>
        <div class="dropdown-menu dropdown-menu-right shadow animated--fade-in" aria-labelledby="dropdownMenuLink">
          <a class="dropdown-item" href="#">Экспорт в Excel</a>
        </div>
      </div>
    </div>
    <div class="card-body">
      <router-link class="btn btn-dark btn-circle btn-lg"
          v-b-tooltip.hover title="Добавить товар"
          id="add-product-btn"
          tag="button"
          to="/createProduct">
        <i class="fas fa-plus"></i>
      </router-link>

      <DataTable :itemsProvider="itemsProvider" :fields="fields" ref="productTable">
        <template v-slot:cell(actions)="data">
          <span class="action-bar">
            <router-link
                tag="button"
                class="btn btn-circle btn-dark btn-sm m-1"
                v-b-tooltip.hover title="Детали"
                :to="{ name: 'view-product', query: {productId: data.item.id}}">
              <i class="fas fa-info"></i>
            </router-link>
            <router-link
                tag="button"
                class="btn btn-circle btn-dark btn-sm m-1"
                v-b-tooltip.hover title="Изменить"
                :to="{ name: 'edit-product', query: {productId: data.item.id}}">
              <i class="fas fa-pencil-alt"></i>
            </router-link>

            <button class="btn btn-circle btn-dark btn-sm m-1" v-b-tooltip.hover title="Внести на склад" @click="showModalForDelete(data.id)">
              <i class="fas fa-dolly-flatbed"></i>
            </button>
            <button class="btn btn-circle btn-dark btn-sm m-1" v-b-tooltip.hover title="Статистика" @click="showModalForDelete(data.id)">
              <i class="fas fa-chart-bar"></i>
            </button>
            <router-link
                tag="button"
                class="btn btn-circle btn-dark btn-sm m-1"
                v-b-tooltip.hover title="Клонировать"
                :to="{ name: 'create-product', query: {sourceId: data.item.id}}">
              <i class="fas fa-clone"></i>
            </router-link>
            <button class="btn btn-circle btn-danger btn-sm m-1" v-b-tooltip.hover title="Удалить" @click="showModalForDelete(data.item.id)">
              <i class="fas fa-trash"></i>
            </button>
          </span>
        </template>
      </DataTable>
    </div>
  </div>

  <b-modal ref="delete-product-modal" :static="true">
    <template v-slot:modal-title>
      Удаление товара
    </template>
    <div class="d-block text-center">
      Вы действительно хотите удалить этот товар ?
    </div>
    <template v-slot:modal-footer>
      <button class="btn btn-secondary float-left" @click="$refs['delete-product-modal'].hide()">Нет</button>
      <button class="btn btn-danger float-right" @click="deleteProduct">Да</button>
    </template>
  </b-modal>
</div>
</template>

<script>
import DataTable from '@/components/ApiDataTable'
import { mapGetters } from 'vuex'
import _ from 'lodash'

export default {
  components: {
    DataTable
  },
  data: () => ({
    products: [],
    fields: [{
      key: 'name',
      label: "Название",
      sortable: true
    },
    {
      key: 'category.name',
      label: 'Категория',
      sortable: true
    },
    {
      key: 'price',
      label: 'Цена',
      sortable: true
    },
    {
      key: 'quantity',
      label: 'Количество на складе',
      sortable: true
    },
    {
      key: 'actions',
      label: 'Действия',
      sortable: false
    }],
    stringForSearch: null,
  }),
  created : async function() {
    this.retrieveOrdersWithDelay = _.debounce(this.applyFilters, 800);
  },
  watch: {
    stringForSearch: function() {
      this.retrieveProductsWithDelay();
    }
  },
  computed: {
    ...mapGetters(['allProducts', 'totalProductsCount']),
    rows() {
      return this.products.length
    }
  },
  methods: {
    showModalForDelete(productId) {
      const modal = this.$refs['delete-product-modal'];
      modal.productId = productId;
      modal.show();
    },
    deleteProduct() {
      const component = this;
      const modal = this.$refs['delete-product-modal'];
      component.$store.dispatch('deleteProduct', modal.productId).then(function() {
        component.products = component.allProducts;
        modal.hide();
      });
    },
    async itemsProvider(ctx) {
      try {
        const filters = {
          pageNumber: ctx.currentPage,
          perPage: ctx.perPage,
          stringForSearch: ctx.filter
        };

        if (ctx.sortBy.length) {
          filters.sortBy = ctx.sortBy;
          filters.sortDesc = ctx.sortDesc;
        }
        await this.$store.dispatch('fetchProductsByFilters', filters);
        return {
          items: this.allProducts,
          totalItems: this.totalProductsCount
        };
      } catch (error) {
        console.error(error);
        return [];
      }
    },
    applyFilters() {
      this.$refs.productTable.refresh();
    }
  }
}
</script>

<style scoped>
#add-product-btn {
  position: fixed;
  bottom: 50px;
  right: 50px;
}

#perPageSelect {
  width: 70px;
  display: inline-block;
}

.form-control:focus {
  box-shadow: none;
}
</style>
