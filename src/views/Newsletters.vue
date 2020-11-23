<template>
  <div>
    <div class="card shadow mb-4">
      <router-link
        class="btn btn-dark btn-circle btn-lg"
        v-b-tooltip.hover
        title="Новая рассылка"
        id="add-newsletter-btn"
        tag="button"
        to="/createOrder"
      >
        <i class="fas fa-plus"></i>
      </router-link>
      <div
        class="card-header py-3 d-flex flex-row align-items-center justify-content-between"
      >
        <h6 class="m-0 font-weight-bold text-primary">Рассылки</h6>
      </div>
      <div class="card-body">
        <DataTable
          :itemsProvider="itemsProvider"
          :fields="fields"
          ref="newsletterTable"
        >
          <!-- <template v-slot:cell(actions)="data">
          <span class="action-bar">
            <router-link
                tag="button"
                class="btn btn-dark btn-sm m-1 table-toolbar-btn"
                v-b-tooltip.hover title="Детали"
                :to="{ name: 'client-info', query: {clientId: data.item.id}}">
              <i class="fas fa-info"></i>
            </router-link>
          </span>
        </template> -->
        </DataTable>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import DataTable from "@/components/ApiDataTable";
import _ from "lodash";

export default {
  components: {
    DataTable,
  },
  data: () => ({
    fields: [
      {
        key: "createdDate",
        label: "Дата создания",
        sortable: true,
      },
      {
        key: "dispatchDate",
        label: "Дата отправки",
        sortable: true,
      },
      {
        key: "createdBy",
        label: "Создано",
        sortable: true,
      },
      {
        key: "actions",
        label: "Действия",
        sortable: false,
      },
    ],
    stringForSearch: null,
  }),
  watch: {
    stringForSearch: function () {
      this.retrieveNewslettersWithDelay();
    },
  },
  created: async function () {
    this.retrieveNewslettersWithDelay = _.debounce(this.applyFilters, 800);
  },
  methods: {
    applyFilters() {
      this.$refs.newsletterTable.refresh();
    },
    async itemsProvider(ctx) {
      const filters = {
        pageNumber: ctx.currentPage,
        perPage: ctx.perPage,
        stringForSearch: ctx.filter,
      };

      if (ctx.sortBy.length) {
        filters.sortBy = ctx.sortBy;
        filters.sortDesc = ctx.sortDesc;
      }
      return await this.$store.dispatch("fetchNewslettersByFilters", filters);
    },
  },
};
</script>

<style scoped>
  #add-newsletter-btn {
    position: fixed;
    bottom: 50px;
    right: 50px;
    z-index: 500;
  }

</style>
