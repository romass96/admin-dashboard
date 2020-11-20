<template>
<div>
  <div class="card shadow mb-4">
    <div class="card-header py-3 d-flex flex-row align-items-center justify-content-between">
      <h6 class="m-0 font-weight-bold text-primary">Клиенты</h6>
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
      <DataTable :itemsProvider="itemsProvider" :fields="fields" ref="clientTable"/>
    </div>
  </div>

</div>
</template>

<script>
import { mapGetters } from 'vuex'
import DataTable from '@/components/ApiDataTable'
import _ from 'lodash'

export default {
  components: {
    DataTable
  },
  data: () => ({
    fields: [{
      key: 'firstName',
      label: "Имя",
      sortable: true
    },
    {
      key: 'lastName',
      label: 'Фамилия',
      sortable: true
    },
    {
      key: 'email',
      label: 'Email',
      sortable: true
    },
    {
      key: 'phoneNumber',
      label: 'Телефон',
      sortable: true
    },
    {
      key: 'ordersCount',
      label: 'Количество заказов',
      sortable: true
    }],
    stringForSearch: null
  }),
  computed: {
    ...mapGetters(['allClients', 'totalClientsCount'])
  },
  watch: {
    stringForSearch: function() {
      this.retrieveOrdersWithDelay();
    }
  },
  created: async function() {
    this.retrieveClientsWithDelay = _.debounce(this.applyFilters, 800);
  },
  methods: {
    applyFilters() {
      this.$refs.clientTable.refresh();
    },
    async itemsProvider(ctx) {
      try {
        const filters = {
          pageNumber: ctx.currentPage,
          perPage: ctx.perPage,
          status: this.orderStatus,
          stringForSearch: ctx.filter
        };

        if (ctx.sortBy.length) {
          filters.sortBy = ctx.sortBy;
          filters.sortDesc = ctx.sortDesc;
        }
        await this.$store.dispatch('fetchClientsByFilters', filters);
        return {
          items: this.allClients,
          totalItems: this.totalClientsCount
        };
      } catch (error) {
        console.error(error);
        return [];
      }
    }
  }
}
</script>
