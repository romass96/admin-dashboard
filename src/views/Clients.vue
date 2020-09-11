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
      <DataTable :items="clients" :fields="fields"/>
    </div>
  </div>

</div>
</template>

<script>
import { mapGetters } from 'vuex'
import DataTable from '@/components/DataTable'

export default {
  components: {
    DataTable
  },
  data: () => ({
    clients: [],
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
    }]
  }),
  mounted : async function() {
    await this.$store.dispatch('fetchClientsIfTheyAreNotLoaded');
    this.clients = this.allClients;
  },
  computed: {
    ...mapGetters(['allClients'])
  }
}
</script>
