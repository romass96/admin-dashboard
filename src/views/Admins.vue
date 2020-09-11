<template>
<div>
  <div class="card shadow mb-4">
    <div class="card-header py-3 d-flex flex-row align-items-center justify-content-between">
      <h6 class="m-0 font-weight-bold text-primary">Админы</h6>
    </div>
    <div class="card-body">
      <DataTable :items="users" :fields="fields"/>
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
    users: [],
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
      key: 'role',
      label: 'Роль',
      sortable: true,
      formatter: value => {
        return value === 'ADMIN' ? 'Администратор' : 'Менеджер';
      }
    }]
  }),
  mounted : async function() {
    await this.$store.dispatch('fetchUsersIfTheyAreNotLoaded');
    this.users = this.allUsers;
  },
  computed: {
    ...mapGetters(['allUsers'])
  }
}
</script>
